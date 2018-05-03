// =========================================================================================
// Passport authentication middleware for token based authentication
// =========================================================================================

const appConfig     = require('../app-config');
const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const userModel     = require('../models/user');

/**
 * Represents the passport authentication middleware
 * @param {passport} passport - This is the passport instance
 */
module.exports = function(passport) {

    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: appConfig.PASSPORT_SECRET
    };

    const jwtStrategy = new JwtStrategy(options, function(jwtPayload, next) {
        userModel.findOne({ EmailId: jwtPayload.EmailId }, function(err, user) {
            if (err) {
                throw err;
                return next(err, user);
            }
            if (user) {
                next(null, user);
            }
            else {
                next(null, false);
            }
        });
    });

    passport.use('jwt', jwtStrategy);
};