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
const mainRouter     = require('./routes/main-routes');
const enableCORS     = require('./middlewares/enable-cors');
const passportModule = require('./middlewares/passport-auth')(passport);
// const apiOptions     = require('./middlewares/apiOptions.js');

// Get port number
// const port = process.env.PORT || 5000;

// // Instantiate express
// const app = express();

// // Configure body parser
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(morgan('dev'));

// // CORS Enable all origins
// app.use(enableCORS);

// // Initialize passport for use and configure JWT strategy
// app.use(passport.initialize());

// // Instantiate all controllers
// requireAll({
//     dirname: __dirname + '/controllers',
//     filter:  /(.+controller)\.js$/,
//     recursive: false
// });

// app.use(apiOptions);

// // Register the API routes
// // All of the routes must be prefixed with /api
// app.use('/api', router);

// // Start the API Server
// // =================================================================================
// app.listen(port);
// console.log('Ziptag App started on port ' + port);

// // Start the static files server
// // =================================================================================
// const appStatic = express();
// const webPort = process.env.WEBPORT || 4000;
// appStatic.use('/', express.static(path.join(__dirname, 'public/admin/dist/')))
// appStatic.listen(webPort);
// console.log('Ziptag Webapp started on port ' + webPort);