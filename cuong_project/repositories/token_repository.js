'use strict';

var models = require("../models");

var TokenRepository = {
    findAll: function () {
        return models.Token.find();
    },
    findByUserId: function (user_id) {
        return models.Token.findOne({ user: user_id });
    },
    findById: function (id) {
        return models.Token.findOne({ _id: id });
    },
    create: function (token) {
        let new_token = new models.Token(token);
        return new_token.save();
    }
}

module.exports = TokenRepository;
