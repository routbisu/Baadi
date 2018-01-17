const bcrypt            = require('bcrypt');
const jwt               = require('jsonwebtoken');
const appConfig         = require('../config/init/appConfig');
const GetErrorMessage   = require('../config/init/errorMessages');
const validationHelper  = require('../helpers/validationHelper');

// Get user mongoose model
const UserModel = require('../models/user');

let authenticationService = {
    /**
     * Authenticate the user to check if email password combo exists
     * @param {user} userdetail - Details of the user : Email and Password
     * @param {callback} callback - CB to handle the login process
     */
    AuthenticateUser: function(loginUser, callback) {
        UserModel.findOne({
            email_id: loginUser.email_id
        }, function(err, user) {
            if(err) {
                return callback(err, null);  
            }
            else {
                if(!user) {
                    return callback({ message: GetErrorMessage(601) }, null);  
                }

                // Check if the password matches
                user.comparePassword(loginUser.password, function(err, isMatch) {
                    if(isMatch && !err) {
                        // Create the access token
                        let token = jwt.sign({ user_id: user._id}, appConfig.PassportSecret, {
                            expiresIn: 10080    // In minutes
                        });

                        return callback(null, { token: 'Bearer ' + token });
                    }
                    else {
                        return callback({ message: 'Incorrect password.' }, null);
                    }
                });
            }
        });
    },
    
    /**
     * Register a new user
     * @param {user} user
     * @param {callback} callback
     */
    AddNewUser: function(user, callback) {

        let errors = [];
        
        // Validations for user data
        if(!user.first_name) { errors.push(GetErrorMessage(101)); }
        if(!user.last_name) { errors.push(GetErrorMessage(102)); }
        if(!user.email_id) { 
            errors.push(GetErrorMessage(103)); 
        } else { 
            if(!validationHelper.IsValidEmail(user.email_id)) {
                errors.push(GetErrorMessage(104)); 
            } 
        }
        if(!user.password) { errors.push(GetErrorMessage(105)); }

        if(!user.city || !validationHelper.IsValidCity(user.city)) { errors.push(GetErrorMessage(106)) }
        
        if(errors.length > 0) {
            return callback(errors, null);
        }
        else {
            var newUser = new UserModel({
                first_name: user.first_name,
                last_name: user.last_name,
                email_id: user.email_id,
                password: user.password,
                contact: user.contact ? user.contact : '',
                city: user.city,
                is_active: true,
                is_admin: false
            });

            newUser.save(function(err) {
                if(err)
                    return callback(err, null);
                else
                    return callback(null, true);
            });
        }
    }
}

module.exports = authenticationService;