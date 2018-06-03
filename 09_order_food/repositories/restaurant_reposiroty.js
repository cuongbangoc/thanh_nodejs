'use strict';

var models = require("../models");

var RestauranrRepository = {
    create: function (restaurant){
        let new_restaurant = new models.Restaurant(restaurant);
        return new_restaurant.save();
    },
    findById: function (id){
        return models.Restaurant.findOne({_id: id});
    }
}

module.exports = RestauranrRepository;