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
},{
    collection: "foods",
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

module.exports = mongoose.model("Food", food);