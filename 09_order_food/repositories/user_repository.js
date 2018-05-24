'use strict';

var models = require("../models");

var UserRepository = {
    findAll: function () {
        return models.User.find();
    },
    findByEmail: function (email) {
        return models.User.findOne({email: email});
    },
    findById: function (id) {
        return models.User.findOne({ _id: id });
    },
    updateUser: function(user, params){
        return models.User.update({_id: user._id}, {$set: {firstname: params.firstname, lastname: params.lastname,
             masinhvien: params.masinhvien}});
    },
    create: function (user) {
        let new_user = new models.User(user);
        return new_user.save();
    }
}

module.exports = UserRepository;
