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

// User roles
const userRoles = [
    { role: 'RESIDENT', desc: 'Owner/Tenant - lowest level of access' },
    { role: 'SOCIETY_MEMBER', desc: 'Society member - has higher level of access' },
    { role: 'SOCIETY_ADMIN', desc: 'Society admin - higher level access than society member' },
    { role: 'SUPER_ADMIN', desc: 'Product super admin - controls everything' }    
]

// DB Connection String
const dbConnString = 'mongodb://root:Baadi%402018@ds247317.mlab.com:47317/baadi';

// Passport Secret
const passportSecret = 'LifeAfterYou';

// Server Port 
const serverPort = 5000;

// Generic server error message
const genericServerError = 'There was an unexpected error. Please contact info@baadi.in for assistance.';

// Node file logger configuration
const nodeFileLoggerOptions = {
    timeZone: 'America/Los_Angeles',
    folderPath: './logs/',      
    dateBasedFileNaming: true,
    // Required only if dateBasedFileNaming is set to true
    fileNamePrefix: 'Logs_',
    fileNameExtension: '.log',    
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss.SSS',
    // Change to 'prod' for production
    logLevel: 'debug',
    onlyFileLogging: false
}

const appConfig = {
    DB_CONNECTION_STRING: dbConnString,
    USER_ROLES: userRoles,
    EMAIL_CONFIG: emailConfig,
    GOOGLE_AUTH: googleAuth,
    PASSPORT_SECRET: passportSecret,
    SERVER_PORT: serverPort,
    LOGGER_OPTIONS: nodeFileLoggerOptions,
    GENERIC_SERVER_ERROR_MSG: genericServerError
}

module.exports = appConfig;