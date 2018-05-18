const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User Schema
const User = new Schema({
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true
    },
    firstname: String,
    lastname: String,
    password: {
        type: String,
        require: true
    },
    salt: {
        type: String
    }
}, {
    collection: 'users',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('User', User);