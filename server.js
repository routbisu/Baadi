// =================================================================================
// Base Setup
// =================================================================================

// Node Modules
const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const passport      = require('passport');
const requireAll    = require('require-all');
const ejs           = require('ejs');
const path          = require('path');

// Project Modules
// const enableCORS        = require('./middlewares/enableCORS');
// const router            = require('./routes/routes');
// const passportModule    = require('./middlewares/passportAuth.js')(passport);
// const apiOptions        = require('./middlewares/apiOptions.js');

// Get port number
const port = process.env.PORT || 5000;
const b = 31;
// Instantiate express
const app = express();  

// Configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());;;
app.use(morgan('dev'));;

// CORS Enable all origins
//app.use(enableCORS);

// Initialize passport for use and configure JWT strategy
app.use(passport.initialize());

// Instantiate all controllers
requireAll({
    dirname: __dirname + '/controllers',
    filter:  /(.+controller)\.js$/,
    recursive: false
});

app.use(apiOptions);

// Register the API routes
// All of the routes must be prefixed with /api
app.use('/api', router);

// Start the API Server
// =================================================================================
app.listen(port);
console.log('Ziptag App started on port ' + port);

// Start the static files server
// =================================================================================
const appStatic = express();
const webPort = process.env.WEBPORT || 4000;   
appStatic.use('/', express.static(path.join(__dirname, 'public/admin/dist/')))
appStatic.listen(webPort);
console.log('Ziptag Webapp started on port ' + webPort);
/**
 * Configure express to serve static html pages inside of your public folder
 */

/**
 * Set up the view engine
 */

// app.set('views', __dirname + '/public');
// app.engine('.html', ejs.renderFile);
// app.set('view engine', 'html');
// app.set('view options', { layout: false });

// /**
//  * Register the public directory
//  */
// app.use(express.static(path.join(__dirname, '/public')));

// /**
//  * Set the server routes
//  */
 
//  var routingController = require('./controllers/routing.controller');

//  /**
//   * User pages
//   */
// app.get('/:userPage', routingController.userPage);
// app.get('/partials/:partial', routingController.userPagePartial);

// /**
//  * Admin pages
//  */
// app.get('/admin/:adminPage', routingController.adminPage);
// app.get('/admin/partials/:partial', routingController.adminPagePartial);

// /**
//  * Default route for admin - Render admin index page
//  */
// app.get('/admin/*', function (req, res) {
//     res.render('/admin/index');
// });

// /**
//  * Default route for user - Render user index page
//  */
// app.get('*', function (req, res) {
//     res.render('index');
// });


