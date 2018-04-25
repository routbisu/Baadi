// =================================================================================
// Application configuration file
// =================================================================================

const devConfig = require('./config/dev');
const uatConfig = require('./config/uat');
const prodConfig = require('./config/prod');

/**
 * Export configuration
 */
module.exports = devConfig;