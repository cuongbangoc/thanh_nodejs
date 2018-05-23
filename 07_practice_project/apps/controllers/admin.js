var express = require("express");
var router = express.Router();
var user_md = require("../models/users.js");
var post_md = require("../models/posts.js");

var helper = require("../helpers/helper.js");

router.get("/", function(req, res){
		//res.json({"message": "this is admin page"});
		var data = post_md.getAllPosts();
		data.then(function(posts){
			let data = {
				posts: posts,
				error: false
			}
			res.render("admin/dashboard.ejs", {data:data});
		}).catch(function(error){
			res.render("admin/dashboard.ejs", {data: {error: "Get post data is error"}});
		});

});


//SIGNUP
router.get("/signup", function(req, res){

	res.render("signup.ejs", {data: {}});
});

router.post("/signup", function(req, res){
	var user = req.body;
	// console.log(req);
	// console.log(user);
	if (user.email.trim().length == 0){
		res.render("signup.ejs", {data: {error: "email is require"}});
	}
	if (user.passwd != user.repasswd && user.passwd.trim().length !=0){
		res.render("signup.ejs", {data: {error: "password is not match"}});
	}

	// insert hash vao DB
	var password = helper.hash_password(user.passwd);

	user = {
		email: user.email,
		password:password,
		first_name:user.firstname,
		last_name: user.lastname
	};
	let results = user_md.addUser(user);

	results.then(function(data){
		res.redirect("/admin/signin");
	}).catch(function(err){
		res.render("signup.ejs", {data: {error: "Could not insert to DB"}});
	});

});

//Signin
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
				if(users && users.length == 0){
					res.render("signin.ejs", {data: {error: "User is not found"}});
				}else{
					let user = users[0];
					console.log(user)

					// so sanh pass word voi password ng dung nhap
					let status = helper.compare_password(params.password, user.password);
					if (!status){
						res.render("signin.ejs", {data: {error: "password is incorrect"}});
					}else{
						req.session.user = user;
						console.log(req.session.user);
						res.redirect("/admin");
					}
				}
				
			});
		}else{
			res.render("signin.ejs", {data: {error: "Email is not exists"}});
		}
		
	}
});

// Add new post
router.get("/post/new", function(req, res){
	if (req.session.user){
		res.render("admin/post/new.ejs", {data: {error: false}});
	}else{
		res.redirect("/admin/signin");
	}
	
});

// Logic cho viec add new post
router.post("/post/new", function(req,res){
	var params = req.body;

	// Check xem da nhap titel chua
	if (params.title.trim().length == 0){
		let data = {
			error: "Please insert title of new post"
		}
		res.render("admin/post/new.ejs", {data: data});

	// neu da co titel roi thi moi insert new post	
	}else{
		var now = new Date();
		params.created_at = now;
		params.updated_at = now;

		var data = post_md.addPost(params);

		data.then(function(results){
			res.redirect("/admin");
		}).catch(function(error){
			var data = {
				error: "could not insert post"
			}
			res.render("admin/post/new", {data:data});
		});
	}
	
});

// Cap nhat bai viet
router.get("/post/edit/:id", function(req, res){
	if (req.session.user){
		let id = req.params.id;
		let data_md = post_md.getPostById(id);

		data_md.then(function(posts){
			let post = posts[0];
			let data = {
				post: post,
				error: false
			}
			res.render("admin/post/edit", {data: data})
		}).catch(function(error){
			let data= {
				error: "could not get post with id" + id
			}
			res.render("damin/post/edit", {data:data});
		});
	}else{
		res.redirect("/admin/signin");
	}
	
});

router.put("/post/edit", function(req, res){
	let params = req.body;

	let data_db = post_md.updatePosts(params);

	if(!data_db){
		res.json({
			code: 500,
			message: "Error"
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
				message: "Error 2"
			});
		});
	}
});


//Delete bai viet
router.delete("/post/delete", function(req, res){
	let id = req.body.id;
	let data_db = post_md.deletePost(id);

	if (!data_db){
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
				message: "Loi DB2"
			});
		});
	}
});

//List user
router.get("/users", function(req, res){
	let data = user_md.getAllUsers();
	data.then(function(users){
		let data = {
			users: users,
			error: false
		}
		res.render("admin/users.ejs", {data: data});
	}).catch(function(error){
		let data = {
			error: "loi roi"
		}
		res.render("admin/users.ejs", {data: data});
	});
});

module.exports = router;