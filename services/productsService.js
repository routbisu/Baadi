// =========================================================================================
// Products service to manage list of products
// =========================================================================================

const appConfig = require('../config/init/appConfig');
const util = require('util');

// Get product mongoose model
const productModel = require('../models/product');

let productsService = {
    
    // Get list of all products
    GetAll: function() {
        return new Promise(function(resolve, reject) {
            productModel.find(function(err, products) {
                if(err) 
                    reject(err);
                else
                    resolve(products);
            });
        });
    },


}

module.exports = productsService;