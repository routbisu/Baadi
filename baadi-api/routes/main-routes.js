// =================================================================================
// Routes for the main API
// =================================================================================

const express = require('express');
const passport = require('passport');
const router = express.Router();

// API Reference docs - Home page
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to Baadi REST API'});
});

// Export the router module
module.exports = router;