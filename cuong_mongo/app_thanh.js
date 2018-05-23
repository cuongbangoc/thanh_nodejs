// require mongose
const mongoose = require("mongoose");

//connect mongose voi mongodb
let conn = mongoose.connect("mongodb://localhost:27017/blog");

// Tao schema
const Schema = mongoose.Schema;

// Tao schema user
let user_schema = new Schema({
    emai: {
        type: String
    },
    password: {
        type: String
    },
    first_name:{
        type: String
    },
    last_name:{
        type: String
    },
    created_at:{
        type: String
    },
    updateted_at:{
        type: String
    }
});

// Tao model cho collection user
let user_model = mongoose.model("user", user_schema);

// Tao schema cho collection post
let post_schema = new Schema({
    title:{
        type: String
    },
    content:{
        stype: String
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    created_at: {
        type: String
    },
    updateted_at: {
        type: String
    }
});

// tao model cho collection post
let post_model = mongoose.model("post", post_schema);

// Insert user
// Instance user 1
let user_thanh = new user_model({
    email: "thanhbangoc@gmail.com",
    password: "thanh123",
    first_name: "ngoc",
    last_name:"thanh",
    created_at: new Date(),
    updateted_at: new Date()
});

// save user thanh vao DB
user_thanh.save(function(err, user_thanh){
    if (!err){
        console.log(user_thanh);

        // Insert post vao
        //instance first post
        let first_post = new post_model({
            title:"the first post",
            content: "This is the first post",
            user_id: user_thanh._id,
            created_at: new Date(),
            updateted_at: new Date()
        });

        // save first post
        first_post.save(function(err, first_post){
            if (err){
                console.log(err);
            }else{
                console.log("insert the first post success");
            }
        });

        // instance second post
        let second_post = new post_model({
            title: "The second post",
            content: "This is the second post",
            user_id: user_thanh._id,
            created_at: new Date(),
            updateted_at: new Date()
        });

        // save second post
        second_post.save(function(err, second_post){
            if(err){
                console.log(err);
            }else{
                console.log("insert the second post success");
            }
        });
    }else{
        console.log(err);
    }
});

// instance user 2
let user_cuong = new user_model({
    email: "cuongbangoc@gmail.com",
    password: "cuong123",
    first_name: "ngoc",
    last_name: "cuong",
    created_at: new Date(),
    updateted_at: new Date()
});

// Save user cuong vao DB
user_cuong.save(function(err, user_cuong){
    if (!err){
        console.log(user_cuong);

        // insert third post
        let third_post = new post_model({
            title: "the third post",
            content: "This is the third post",
            user_id: user_cuong._id,
            created_at: new Date(),
            updateted_at: new Date()
        });

        // Save third post
        third_post.save(function(err, third_post){
            if(err){
                console.log(err);
            }else{
                console.log("insert the third post success");
            }
        });
    }else{
        console.log(err);
    }
});