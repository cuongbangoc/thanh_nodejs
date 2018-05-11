const mongoose = require("mongoose");
// Connect to mongodb
let conn = mongoose.connect("mongodb://localhost:27017/student");
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
        ref: "Lophoc" // De populate sang lophoc va lay thong tin lop hoc
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
let lophocB = new lophoc_model({
    name: "Lop B"
});

// lophocB.save(function(err, new_lophocA) {
//     if(!err){
//         console.log(new_lophocA);

//         // Insert new hoc sinh who has this lophoc
//         let hocsinh_A = new hocsinh_model({
//             name: "Thanh",
//             address: ["HY", "HN"],
//             lophoc_id: new_lophocA._id
//         });

//         hocsinh_A.save(function (err) {
//             if(err){
//                 console.error(err);
//             }else{
//                 console.log("Insert hoc sinh A success");
//             }
//         });
//     }else{
//         console.error(err);;
//     }
// });

// === Get ALL cach 1 voi callback
lophoc_model.find({name: "Lop A"}, {_id: 1}, function (err, arr_lophoc) {
    if(err){
        console.error(err);
    }else{
        console.log(arr_lophoc);
    }
});

//  === Get all cach 2 voi ham exec
lophoc_model.find({}).limit(10).sort({name: 1}).exec(function(err, arr_lophoc) {
    if(err){
        console.error(err);
    }else{
        console.log(arr_lophoc);
    }
});

// === Get One
lophoc_model.findOne({}).exec(function (err, lophoc) {
    if(err){
        console.error(err);
    }else{
        console.log("GET ONE ==== ");
        console.log(lophoc);
    }
});

// ==== Update cach 1
// lophoc_model.findOne({name: "Lop A"}).exec(function (err, lophoc) {
//     if (err) {
//         console.error(err);
//     } else {
//         // Update
//         if(lophoc){
//             console.log("GET ONE to update ==== ");
//             console.log(lophoc);
//             lophoc.name = "Lop C";
//             lophoc.save(function (err) {
//                 if (err) {
//                     console.error(err);
//                 } else {
//                     console.log("Update success");
//                 }
//             })
//         }
//     }
// });

// //  === Update
// lophoc_model.update({name: "Lop C"}, {$set: {name: "Lop A"}}, {upsert: true}, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Update success 2");
//     }
// });

// //  === Delete cach 1
// lophoc_model.findOne({name: "Lop A"}).exec(function(err, lophoc){
//     if(err){
//         console.log(err);
//     }else{
//         if(lophoc){
//             // Delete
//             lophoc.remove(function (err) {
//                 if(err){
//                     console.log(err);
//                 }else{
//                     console.log("Delete success");
//                 }
//             });
//         }
//     }
// });

// // Delete cach 2
// lophoc_model.deleteMany({name: "Lop B"}, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Delete many success");
//     }
// })


// ====Referrence Object
hocsinh_model.find({}).populate("lophoc_id").exec(function (err, arr_hocsinh) {
    if(err){
        console.log(err);
    }else{
        console.log("===== HOC SINH =====");
        console.log(arr_hocsinh);
        console.log("====================");
    }
})