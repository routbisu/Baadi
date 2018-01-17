// =========================================================================================
// Mongoose model for Category
// =========================================================================================

// Get instance of mongoose connection
const mongoose = require('../config/init/db');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category_name: String,
    category_description: String,
    icon_path: String
});

module.exports = mongoose.model('Category', CategorySchema);