/**
 * Contains all configuration data
 */

// Dev Database Connection String
const devDBConnectionString = 'mongodb://admin:admin@ds143532.mlab.com:43532/ziptag';
// QA Database Configuration
const qaDBConnectionString = 'mongodb://admin:admin@ds143532.mlab.com:43532/ziptagqa';

// Email Configuration - Admin / Batch jobs
const emailConfig = {
    DefaultFromEmail: 'info@ziptag.in',
    DefaultFromEmailFrom: 'Ziptag Admin',
    EmailHostName: 'smtp.zoho.com',
    EmailPort: '465',
    DefaultEmailUser: 'info@ziptag.in',
    DefaultEmailPassword: 'Ziptag@2017'
}

// List of cities
const cities = [
    { CityCode: 'BLR', CityName: 'Bengaluru' },
    { CityCode: 'MYS', CityName: 'Mysuru' },
    { CityCode: 'BOM', CityName: 'Mumbai' },
]

// Google authentication - Config
const googleAuth = {
    clientID: '',
    clientSecret: '',
    callbackURL: ''
}

// Exported configuration object
const appConfig = {
    DBConnectionString: devDBConnectionString,
    EmailConfig: emailConfig,
    AllCities: cities,
    PassportSecret: 'SerenityPrayer'
};

module.exports = appConfig;