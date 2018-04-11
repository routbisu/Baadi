//**************************************************************************
// Contains methods for data validation
//**************************************************************************
const appConfig         = require('../app-config');
const emailValidator    = require('email-validator');

const validationHelper = {
    /**
     * Check valid email ID
     * @param {string} emailID - Email address
     */
    IsValidEmail: function(email) {
        if(emailValidator.validate(email)) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = validationHelper;