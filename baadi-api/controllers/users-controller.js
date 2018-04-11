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
        authService.AddNewUser({
            first_name: req.body.FirstName,
            last_name: req.body.LastName,
            email_id: req.body.EmailID,
            password: req.body.Password,
            phone: req.body.Phone,
            city: req.body.City
        }, function(err, status) {
            if(!err) {
                res.json({ success: true });
            }
            else {
                if(err.code) {
                    if(err.code === 11000) {
                        res.status(400).json({ Message: GetErrorMessage(107) });
                        return;
                    }
                }
    
                res.status(400).json({ Message: err });
            }
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
        authService.AuthenticateUser({
            email_id: req.body.EmailID,
            password: req.body.Password
        }, function(err, status) {
            if(!err) {
                res.json(status)
            }
            else {
                res.json(err);
            }
        });
    } catch(ex) {
        log.Fatal(ex.message, 'users-controller' , 'AuthenticateUser');
        res.status(500).send(appConfig.GENERIC_SERVER_ERROR_MSG);
    }
});