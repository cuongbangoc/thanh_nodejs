var express = require("express");

var router = express.Router();

var user_md = require("../models/users.js");

var helper = require("../helpers/helper.js")

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

	var password = helper.hash_password(user.passwd);

	user = {
		email: user.email,
		password: password,
		first_name: user.firstname,
		last_name: user.lastname
	};

	let results = user_md.addUser(user);

	results.then(function(data){
		res.redirect("/admin/signin");
	}).catch(function(err){
		res.render("signup.ejs", {data: {error: "could not insert to DB"}});
	});

	// if (!results){
	// 	res.render("signup.ejs", {data: {error: "could not insert to DB"}});	
	// }else{
	// 	res.json({message: "insert success data to DB"});	
	// }
});

router.get("/signin", function(req, res){
	res.render("signin.ejs", {data: {}});
});

router.post("/signin", function(req, res){
	var params = req.body;

	if (params.email.trim().length == 0){
		res.render("signin.ejs", {data: {error: "Please enter email"}});
	}else{
		var data = user_md.getUserByEmail(params.email);

		if (data){
			data.then(function(users){
				let user = users[0];
				
				let status = helper.compare_password(params.password, user.password);
				console.log(status);
				if(!status){
					res.render("signin.ejs", {data: {error: "password is incorrect"}});
				}else{
					res.redirect("/admin");
				}
			});

		}else{
			res.render("signin.ejs", {data: {error: "Email not exists"}});
		}
	}
})
module.exports = router;