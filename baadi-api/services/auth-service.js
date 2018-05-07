const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');
const appConfig     = require('../app-config');
const validator     = require('./validation-service');
const log           = require('node-file-logger');
const moment        = require('moment');

// Get user mongoose model
const UserModel = require('../models/user');

const authenticationService = {    
    /**
     * Adds a new user to the databse
     * @param {user} userdetail - Details of the user 
     * @returns  Promise with sucess object or errors object
     */
    AddNewUser: function(user) {

        // Data validations
        if (user.EmailId) {
            if (!validator.IsValidEmail(user.EmailId)) {
                reject({ ErrorMessage: 'INVALID_EMAIL' });
                return;
            } 
        }

        let promise = new Promise((resolve, reject) => {
            user.IsActive = true;
            user.UserRole = 'RESIDENT';
            let newUser = new UserModel(user);

            // Save new user to database
            newUser.save(function(err) {
                if(err) reject(err);
                resolve(true);
            });
        });

        return promise;
    },

    /**
     * Authenticates a user and generates an access token
     * @param {user} userdetail - Details of the user : Email and Password
     * @return promise
     */
    AuthenticateUser: function(userDetails) {
        return new Promise((resolve, reject) => {
            
            UserModel.findOne({ EmailId: userDetails.EmailId }, 
                (err, user) => {
                    if (err) { 
                        reject(err);
                        return;
                    }
                    if (!user)  {
                        reject({ ErrorMessage: 'USER_NOT_FOUND' });
                        return;
                    }

                    // Compare password
                    user.comparePassword(userDetails.Password).then(isMatch => {
                        if(isMatch) {
                            // Create the access token
                            let JWTToken = jwt.sign(
                                { UserId: user._id, EmailId: user.EmailId, UserRole: user.UserRole }, 
                                appConfig.PASSPORT_SECRET, 
                                { expiresIn: appConfig.TOKEN_VALIDITY });
                            
                            resolve({ 
                                token: 'Bearer ' + JWTToken,
                                user_id: user['_id'],
                                first_name: user['FirstName'],
                                last_name: user['LastName'],
                                email_id: user['EmailId'],
                                user_role: user['UserRole'],
                                user_status: user['IsActive']
                            });
                        }
                    }, err => {
                        reject({ ErrorMessage: 'INCORRECT_PASSWORD' });
                    })
                }
            );
        });
    },

    /**
     * Request for refreshing the JWT token
     * If the token is within grace period, then refresh it and send back the new token,
     * or else return an error
     * @param {string} oldToken - Old JWT Token
     * @return {any} Status & New Token
     */
    RefreshToken: function(oldToken) {
        try {
            var decodedPayload = jwt.verify(oldToken, appConfig.PASSPORT_SECRET, { ignoreExpiration: true });
            // Check if the token is still within graceperiod
            let currentTime = moment().unix();
            if (currentTime - decodedPayload.exp < appConfig.TOKEN_GRACE_PERIOD) {
                let JWTToken = jwt.sign (
                    { 
                        UserId: decodedPayload.UserId, 
                        EmailId: decodedPayload.EmailId, 
                        UserRole: decodedPayload.UserRole 
                    }, 
                    appConfig.PASSPORT_SECRET, 
                    { 
                        expiresIn: appConfig.TOKEN_VALIDITY 
                    }
                );

                return {
                    status: 'SUCCESS',
                    token: 'Bearer ' + JWTToken
                };
            } else {
                return {
                    status: 'GRACE_PERIOD_EXPIRED',
                    token: ''
                };
            }
        } catch(ex) {
            log.Error(ex.message, 'authService' , 'RefreshToken');
            // If invalid token (or modified token) is passed
            return {
                status: 'INVALID_TOKEN',
                token: ''
            };
        }
    }
}

module.exports = authenticationService;