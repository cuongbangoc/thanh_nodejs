var express = require("express");

var router = express.Router();

var user_md = require("../models/users.js")

// /admin/
router.get("/", function(req, res){
	res.json({"message":"this is admin page"});
});

router.get("/signup", function(req, res){
	res.render("signup.ejs", {data: {}});
});

router.post("/signup", function(req, res){
	var user = req.body;

	if (user.email.trim().length == 0){
		res.render("signup.ejs", {data: {error: "Email is require"}});
	}

	if (user.passwd != user.repasswd && user.passwd.trim().length != 0){
		res.render("signup.ejs", {data: {error: "password is not match"}});		
	}

	// insert to DB

	user = {
		email: user.email,
		password: user.passwd,
		first_name: user.firstname,
		last_name: user.lastname
	};

	let results = user_md.addUser(user);

	if (!results){
		res.render("signup.ejs", {data: {error: "could not insert to DB"}});	
	}else{
		res.json({message: "insert success data to DB"});	
	}

});

module.exports = router;