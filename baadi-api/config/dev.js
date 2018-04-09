// =================================================================================
// Development - Application configuration file
// =================================================================================

// Email configuration
const emailConfig = {
    FROM_EMAIL: 'info@ziptag.in',
    FROM_NAME: 'Ziptag Admin',
    EMAIL_HOST: 'smtp.zoho.com',
    EMAIL_PORT: '465',
    EMAIL_USER: 'info@ziptag.in',
    EMAIL_PASSWORD: 'Ziptag@2017'
}

// Google authentication
const googleAuth = {
    CLIENT_ID: '',
    CLIENT_SECRET: '',
    CALLBACK_URL: ''
}

// DB Connection String
const dbConnString = 'mongodb://admin:admin@ds143532.mlab.com:43532/ziptag';

// Passport Secret
const passportSecret = 'LifeAfterYou';

const appConfig = {
    DB_CONNECTION_STRING: dbConnString,
    EMAIL_CONFIG: emailConfig,
    GOOGLE_AUTH: googleAuth,
    PASSPORT_SECRET: passportSecret
}

module.exports = appConfig;