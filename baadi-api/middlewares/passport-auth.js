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
        return next(null, jwtPayload);
    });

    passport.use('jwt', jwtStrategy);
};