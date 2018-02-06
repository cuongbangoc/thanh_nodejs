var express = require("express");

var router = express.Router();

var user_md = require("../models/users.js");
var post_md = require("../models/post.js");

var helper = require("../helpers/helper.js");

// /admin/
router.get("/", function(req, res){
	// res.json({"message":"this is admin page"});
	var data = post_md.getAllPost();
	data.then(function(posts){
		let data = {
			posts: posts,
			error: false
		}
		res.render("admin/dashboard.ejs", {data: data});
	}).catch(function(error){
		res.render("admin/dashboard.ejs", {data: {error: "Get posts data is error"}});
	});
	
});

// SIGNUP
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


// SIGNIN
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
});


// ADD NEW POST
router.get("/post/new", function(req, res){
	res.render("admin/post/new.ejs", {data: {error: false}});
});
router.post("/post/new", function(req,res){
	var params = req.body;

	// neu ma khong nhap title cua bai viet thi se thong bao loi yeu cau nhap tilte truoc khi insert post
	if (params.title.trim().length == 0){
		let data = {
			error: "Please enter the title of new post"
		}
		res.render("admin/post/new.ejs", {data: data}); // render lai trang new post va thong bao loi

	// neu da co title roi thi moi insert post	
	}else{
		params.created_at = new Date();
	 	params.updated_at = new Date();
		let data = post_md.addPost(params);

		data.then(function(data){
			res.redirect("/admin");
		}).catch(function(err){
			let data = {
				error: false
			};
			res.render("admin/post/new.ejs", {data: data});
		});
	}

	 
});

// Trang cap nhat bai viet
router.get("/post/edit/:id", function(req, res){
	let id = req.params.id; // Params
	// let id = req.query.id; // Query

	let data_db = post_md.getPostById(id);
	data_db.then(function(posts){
		let post = posts[0];

		let data_view_edit = {
			post: post,
			error: false
		};

		res.render("admin/post/edit", {data_view_edit: data_view_edit});
	}).catch(function(err){
		let data_view_edit = {
			error: "Could not get post data with id = " + id
		};

		res.render("admin/post/edit", {data_view_edit: data_view_edit});
	});
});

// Controller xu ly update bai post
router.put("/post/edit", function(req, res){
	let params = req.body;

	let data_db = post_md.updatePost(params);
	if(!data_db){
		res.json({
			code: 500,
			message: "Error DB"
		});
	}else{
		data_db.then(function(results){
			res.json({
				code: 200,
				message: "success"
			});
		}).catch(function(error){
			res.json({
				code: 500,
				message: "Error DB 2"
			});
		});
	}
});

// controller xu ly delete bai post
router.delete("/post/delete", function(req, res){
	let id = req.body.id;

	let data_db = post_md.deletePost(id);

	if(!data_db){
		res.json({
			code: 500,
			message: "Error DB"
		});
	}else{
		data_db.then(function(results){
			res.json({
				code: 200,
				message: "delete success"
			});
		}).catch(function(error){
			res.json({
				code: 500,
				message: "Error DB 2"
			});
		});
	}
});
module.exports = router;