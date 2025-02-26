const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, // ✅ Fixed typo (was 'require')
        unique: true,   // ✅ Ensures no duplicate emails
    },
    password: {
        type: String,
        required: true, // ✅ Fixed typo (was 'require')
    }
}, { timestamps: true });

const USER = mongoose.model('User', userSchema); // Capitalized model name
module.exports = USER;
