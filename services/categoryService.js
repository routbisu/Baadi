// =========================================================================================
// Products service to manage list of categories
// =========================================================================================

const appConfig = require('../config/init/appConfig');
const util = require('util');
const GetErrorMessage = require('../config/init/errorMessages');

// Get product mongoose model
const CategoryModel = require('../models/category');

let categoriesService = {
    
    // Add a new category
    CreateNew: function(category) {
        return new Promise(function(resolve, reject) {
            // Validation for categories
            if(!category.category_name) {
                reject(GetErrorMessage(160))
            } else {
                var newCategory = new CategoryModel(category);

                newCategory.save(function(err) {
                    if(err) {
                        reject(GetErrorMessage(800));
                        console.log(err);
                    } else {
                        resolve(true);
                    }
                })
            }
        });
    },

    // Get list of all products
    GetAll: function(options) {
        return new Promise(function(resolve, reject) {
            CategoryModel.find({}, [], options, function(err, categories) {
                if(err) {
                    reject(GetErrorMessage(800));
                    console.log(err);
                }
                else
                    resolve(categories);
            });
        });
    }


}

module.exports = categoriesService;