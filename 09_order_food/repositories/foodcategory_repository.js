'use strict';

var models = require("../models");

var FoodCategoryRepository = {
    create: function (food) {
        let new_food_category = new models.FoodCategory(food);
        return new_food_category.save();
    }
}

module.exports = FoodCategoryRepository;
