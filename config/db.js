/**
 * Database configuration & connection
 */

const appConfig = require('./appConfig');
const util = require('util');

const mongoose = require('mongoose');

mongoose.connect(appConfig.DBConnectionString, {
    useMongoClient: true
});

module.exports = mongoose;