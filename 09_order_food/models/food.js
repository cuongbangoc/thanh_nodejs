const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define food schema
const food = new Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    unit: String,
    food_category: {
        type: Schema.Types.ObjectId,
        ref: "FoodCategory"
    },
    image: String,
    description: String
},{
    collection: "foods",
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

module.exports = mongoose.model("Food", food);