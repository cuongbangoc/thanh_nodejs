const mongoose = require("mongoose");
// Connect to mongodb
let conn = mongoose.connect("mongodb://207.246.109.130:27017/student");
const Schema = mongoose.Schema;

// ==== Tao collection va model
// hocsinh Schema
let hocsinh_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: Array
    },
    lophoc_id: {
        type: Schema.Types.ObjectId,
        ref: "Lophoc"
    }
});

let hocsinh_model = mongoose.model("Hocsinh", hocsinh_schema);

// Lophoc Schema
let lophoc_schema = new Schema({
    name: {
        type: String
    }
});

let lophoc_model = mongoose.model("Lophoc", lophoc_schema);


// ==== Insert
let lophocA = new lophoc_model({
    name: "Lop A"
});

lophocA.save(function(err, new_lophocA) {
    if(!err){
        console.log(new_lophocA);
    }
});