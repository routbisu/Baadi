// =========================================================================================
// Mongoose model for User collection
// =========================================================================================

const bcrypt = require('bcrypt');

// Get instance of mongoose connection
const mongoose = require('../services/db-connection').MONGOOSE;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    FirstName: { 
        type: String, 
        required: true 
    },
    LastName: String,
    EmailId: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    Phone: String,
    Password: {
        type: String,
        required: true
    },
    GoogleLoginId: String,
    IsActive: Boolean,
    IsAdmin: Boolean
});

// Use bcrypt the hash the password before inserting into the users table
UserSchema.pre('save', function(next) {
    var user = this;

    if(this.isModified('Password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.Password, salt, function(err, hash) {
                if(err) return next(err); 
                user.Password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});

// Use brcrypt to compare the password provided by the user and hashed password in DB
UserSchema.methods.comparePassword = function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.Password, function(err, isMatch) {
            if(isMatch) {
                resolve(isMatch);
            } else {
                reject(err);
            }
            if(err) reject(err);
        });
    });
}

module.exports = mongoose.model('User', UserSchema);