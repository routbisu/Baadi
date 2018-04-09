// =================================================================================
// Application configuration file
// =================================================================================

const devConfig = require('./config/dev');
const qaConfig = require('./config/qa');
const prodConfig = require('./config/prod');

/**
 * Export configuration
 */
module.exports = devConfig;