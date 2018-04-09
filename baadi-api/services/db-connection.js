// =========================================================================================
// Get instance of database connection
// =========================================================================================
const appConfig = require('../app-config');
const mongoose = require('mongoose');

mongoose.connect(appConfig.DB_CONNECTION_STRING, { useMongoClient: true });

module.exports = {
    MONGOOSE: mongoose 
};