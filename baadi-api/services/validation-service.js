//**************************************************************************
// Contains methods for data validation
//**************************************************************************
const appConfig         = require('../app-config');
const emailValidator    = require('email-validator');

const validationService = {
    /**
     * Check valid email ID
     * @param {string} emailID - Email address
     */
    IsValidEmail: email => {
        if(emailValidator.validate(email)) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = validationService;