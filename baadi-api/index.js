// ******************************************************************************
// index.js - Entry point to Baadi API
// ******************************************************************************

const express        = require('express');
const bodyParser     = require('body-parser');
const morgan         = require('morgan');
const passport       = require('passport');
const requireAll     = require('require-all');
const ejs            = require('ejs');
const path           = require('path');

// Project Modules
const appConfig      = require('./app-config');
const mainRouter     = require('./routes/main-routes');
const enableCORS     = require('./middlewares/enable-cors');
const passportModule = require('./middlewares/passport-auth')(passport);
// const apiOptions     = require('./middlewares/apiOptions.js');

// Get port number
const port = process.env.PORT || appConfig.SERVER_PORT;

// Instantiate express
const app = express();

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// CORS Enable all origins
app.use(enableCORS);

// Initialize passport for use and configure JWT strategy
app.use(passport.initialize());

// Instantiate all controllers
requireAll({
    dirname: __dirname + '/controllers',
    filter:  /(.+controller)\.js$/,
    recursive: false
});

// app.use(apiOptions);

// Register the API routes
// All of the routes must be prefixed with /api
app.use('/api', mainRouter);

// Start the API Server
// =================================================================================
app.listen(port);
console.log('Baadi API started at port ' + port);