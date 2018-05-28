const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define food_category schema
const food_category = new Schema({
    name: {
        type: String,
        require: true
    }
},{
    collection: "food_categories",
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

module.exports = mongoose.model("FoodCategory", food_category);