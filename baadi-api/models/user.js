// =========================================================================================
// Mongoose model for User collection
// =========================================================================================

const bcrypt = require('bcrypt');

// Get instance of mongoose connection
const mongoose = require('../config/init/db');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email_id: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    contact: String,
    city: String,
    password: {
        type: String,
        required: true
    },
    google_login_id: String,
    is_active: Boolean,
    is_admin: Boolean
});

// Use bcrypt the hash the password before inserting into the users table
UserSchema.pre('save', function(next) {
    var user = this;

    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if(err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});

// Use brcrypt to compare the password provided by the user and hashed password in DB
UserSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if(err) {
            return callback(err)
        }
        callback(null, isMatch);
    });
}

module.exports = mongoose.model('User', UserSchema);