'use strict';

var models = require("../models");

var RestauranrRepository = {
    create: function (restaurant){
        let new_restaurant = new models.Restaurant(restaurant);
        return new_restaurant.save();
    },
    findById: function (id){
        return models.Restaurant.findOne({_id: id});
    },
    delete: function(id){
        return models.Restaurant.deleteMany({_id: id});
    },
    find: function(limit, skip){
        return models.Restaurant.find().limit(limit).skip(skip);
    }
}

module.exports = RestauranrRepository;