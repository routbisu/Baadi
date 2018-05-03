const router        = require('../routes/main-routes');
const passport      = require('passport');
const log           = require('node-file-logger');
const appConfig     = require('../app-config');

router.get('/tickets', passport.authenticate('jwt', { session: false }), function(req, res) {
    try {
       res.json({ Message: 'list of tickets' });
    } catch(ex) {
        // log.Fatal(ex.message, 'users-controller' , 'AuthenticateUser');
        res.status(500).send(appConfig.GENERIC_SERVER_ERROR_MSG);
    }
});