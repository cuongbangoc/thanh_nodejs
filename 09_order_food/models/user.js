const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User Schema
const user = new Schema({
    email: {
        type: String,
        unique: true, // Email này là duy nhất
        require: true,// Yêu cầu phải nhập
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
    firstname: String,
    lastname: String,
    adress: String,
    gender: String,
    birthday: String,
    bobies: String,
    phone: {
        type: String,
        unique: true,
        require: true
    }
}, {
    collection: 'users',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('User', user);