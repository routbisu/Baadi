const router        = require('../routes/main-routes');
const passport      = require('passport');
const authService   = require('../services/auth-service');
const log           = require('node-file-logger');
const appConfig     = require('../app-config');

/**
 * Register a new user
 * @param {user} req - Details of the user (FirstName, LastName, EmailID, Phone, City, Password)
 */
router.post('/registerUser', function(req, res) {
    try {
        authService.AddNewUser(req.body).then(() => {
            res.json({ success: true });
        }, err => {
            res.status(400).json(err);
        });

    } catch(ex) {
        log.Fatal(ex.message, 'users-controller' , 'AddNewUser');
        res.status(500).send(appConfig.GENERIC_SERVER_ERROR_MSG);
    }
});

/**
 * Authenticate user and return a JWT for access to other APIs
 * @param {user} - EmailID and password
 */
router.post('/authenticate', function(req, res) {
    try {
        authService.AuthenticateUser(req.body).then((token) => {
            res.json(token);
        }, err => {
            res.status(400).json(err);
        });
    } catch(ex) {
        log.Fatal(ex.message, 'users-controller' , 'AuthenticateUser');
        res.status(500).send(appConfig.GENERIC_SERVER_ERROR_MSG);
    }
});

/**
 * Refresh the JWT token to continue access 
 */
router.post('/refresh_token', function(req, res) {
    try {
        let response = authService.RefreshToken(req.body.token);
        res.json(response);
    } catch(ex) {
        log.Fatal(ex.message, 'users-controller' , 'RefreshToken');
        res.status(500).send(appConfig.GENERIC_SERVER_ERROR_MSG);
    }
});