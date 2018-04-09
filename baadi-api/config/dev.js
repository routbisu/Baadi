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
const dbConnString = 'mongodb://root:Baadi%402018@ds247317.mlab.com:47317/baadi';

// Passport Secret
const passportSecret = 'LifeAfterYou';

// Server Port 
const serverPort = 5000;

const appConfig = {
    DB_CONNECTION_STRING: dbConnString,
    EMAIL_CONFIG: emailConfig,
    GOOGLE_AUTH: googleAuth,
    PASSPORT_SECRET: passportSecret,
    SERVER_PORT: serverPort
}

module.exports = appConfig;