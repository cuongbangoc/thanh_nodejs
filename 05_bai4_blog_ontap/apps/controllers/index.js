var express = require("express");

var router = express.Router();

const user_model = require("../models/users.js");

// Goi duong dan den cac page admin, blog, list_user.
router.use("/admin", require(__dirname + "/admin.js"));
router.use("/blog", require(__dirname + "/blog.js"));
router.use("/list_user", require(__dirname + "/list_user"));

// Render cac trang:
router.get("/", function(req, res){
	res.render("test.ejs");
});
router.get("/login", function(req, res){
	res.render("login.ejs");
});
router.get("/signup", function(req, res){
	res.render("signup.ejs");
});
router.get("/check_id", function(req,res){
	res.render("check_id.ejs");
});

// Lay req tu login.ejs
router.post("/do_login", function(req, res){
	let form_data = req.body;
	console.log(form_data);

	let email = form_data.email;
	let password = form_data.password;

	let user = user_model.get_user_by_email_and_password(email, password);

	if (user == null){
		res.json({
			message: "this email is unavailabel"
		});
	}else {
		res.redirect("/list_user");
	}
});

// lay req tu signup.ejs
router.post("/do_signup", function(req, res){
	let form_data = req.body;
	let name = form_data.name;
	let email = form_data.email;
	let password = form_data.password;

	let user = user_model.check_insert_users(name, email, password);

	if (user == null){
		res.json({
			message: "this is not signup account"
		});
	}else {
		res.redirect("list_user");
	}
});

// lay req tu check_id.ejs
router.get("/do_checkid", function(req,res){
	let form_data = req.body;
	let id = form_data.ID;

	let user = user_model.check_id(id);

	if (user == null){
		res.redirect("../views/signup");
	}else{
		res.json({
			"user": user_model.check_id()
		});
	}
})
module.exports = router;