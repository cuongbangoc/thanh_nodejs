'use strict';

var models = require("../models");

var FoodCategoryRepository = {
    create: function (food) {
        let new_food_category = new models.FoodCategory(food);
        return new_food_category.save();
    },
    findById: function(id){
        return models.FoodCategory.findOne({_id: id});
    },
    updateFoodCategory: function(id, params){
        return models.FoodCategory.update({_id: id}, {$set: {name: params.name}});
    }
}

module.exports = FoodCategoryRepository;
