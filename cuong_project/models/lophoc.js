const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define lophoc schema
const lophoc = new Schema({
    malophoc: {
        type: String,
        unique: true,
        require: true
    },
    tenlophoc: {
        type: String,
        require: true
    },
    user_id: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
},{
    collection: "lophocs",
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

module.exports = mongoose.model("Lophoc", lophoc);