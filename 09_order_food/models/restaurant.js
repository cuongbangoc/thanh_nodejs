const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define restaurant schema
const restaurant = new Schema({
    name: {
        type: String,
        require: true
    },
    adress: String,
    timeOpen: String,
    menu: [{
        type: Schema.Types.ObjectId,
        ref: "Food"
    }],
},{
    collection: "retaurants",
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

module.exports = mongoose.model("Restaurant", restaurant);