'use strict';
const fs = require('fs'),
    path = require('path'),
    mongoose = require('mongoose'),
    db = {},
    config = require('config');

mongoose.connect(config.get('db.uri'), config.get('db.options'));

// import all file in this dir, except index.js
fs.readdirSync(__dirname)
.filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
})
.forEach(function(file) {
    let model = require(path.join(__dirname, file));
    // db.User = require("user.js");
    // db.Token = 
    // db.Lophoc
    db[model.modelName] = model;
});

db.mongoose = mongoose;
module.exports = db;