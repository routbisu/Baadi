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
    var options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        secretOrKey: appConfig.PASSPORT_SECRET
    };

    var jwtStrategy = new JwtStrategy(options, function(jwtPayload, next) {
        userModel.findOne({_id: jwtPayload.user_id}, function(err, user) {
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

    passport.use(jwtStrategy);
};