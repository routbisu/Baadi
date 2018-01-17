// =========================================================================================
// Mongoose model for Product
// =========================================================================================

// Get instance of mongoose connection
const mongoose = require('../config/init/db');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    product_name: String,
    product_description: String,
    type: String,
    category_id: String
});

module.exports = mongoose.model('Product', ProductSchema);