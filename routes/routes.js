// =================================================================================
// Routes for the API
// =================================================================================
// Get an instance of the express router
const express = require('express');
const passport = require('passport');
const router = express.Router();

const mailer = require('../services/emailService');

// API Reference docs - Home page
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to Ziptag REST API'});
});

// Test Email route - To be removed
router.get('/testemail', function(req, res) {
    var response = mailer.sendEmail('bisu9861861136@gmail.com; sdfjdsjf238edw@dwfddf.in', 'Hello world from Node', 
    '<html><h1 style="color: red">Hello world!</h1><h2>Dont be scared. This is a mail sent by a nodejs server</h2></html>', true)
    .then(function(emailResponse) {
        res.json(emailResponse);
    }, function(error) {
        res.json(error);
    });
});

// Export the router module
module.exports = router;