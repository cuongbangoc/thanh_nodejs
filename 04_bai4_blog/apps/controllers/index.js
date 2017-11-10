var express = require("express");

var router = express.Router();

const user_model = require("../models/users"); // require ket qua cua file users.js
// khi co duong dan /admin thi require file admin.js
router.use("/admin", require(__dirname+"/admin.js"));
router.use("/blog", require(__dirname+"/blog.js"));
router.use("/list_user", require(__dirname + "/list_user.js"));

router.get("/", function(req, res){
	let query = req.query;
	console.log(req.url);
	console.log(query);
	// res.json({"message":"this is home page"});
	res.render("test"); // render file test.ejs sang html de tra ve client
});

// Render trang login
router.get("/login", function(req, res){
    res.render("login");
});

// Render trang signup
router.get("/signup", function(req, res){
	res.render("signup");
})

// render trang checkid

router.get("/check_id", function(req,res){
	res.render("check_id.ejs");
});

// Bat su kien click login
router.post("/do_login", function(req, res){
    // Thuc hien login sau khi click Login
    // B1: Lay thong tin tu Client trong Form
    let form_data = req.body;
    console.log(form_data);
    // B2: Goi model de tim kiem user co email va password duoc truyen len
    // - Neu email va pass ton tai trong mang users thi login thanh cong
    // - Neu email hoac pass ko ton tai trong mang users thi login khong thanh cong
    let email = form_data.email;
    let password = form_data.password;

    // Yeu cau model thuc hien tim kiem user theo email va pass
    let user = user_model.get_user_by_email_and_password(email, password);

    if(user == null){
        // - Neu email hoac pass ko ton tai trong mang users thi login khong thanh cong
        res.json({
            message: "Login failed, email and password invalid"
        });
    }else{
        // - Neu email va pass ton tai trong mang users thi login thanh cong
        //res.redirect("/admin");
        res.redirect("/list_user");
    }
});

router.get("/", function(req, res){
	res.json({"message":"this is home page"});
});


// Bat su kien click sign up
router.post("/do_signup", function(req,res){
	// Lay du lieu tu form
	let form_data = req.body;
	console.log(form_data);
	let name = form_data.name;
	let email = form_data.email;
	let password = form_data.password;

	// Yeu cau model thu hien insert user moi vao user
	// user_model.insert_users(name, email, password);

	// Yeu cau model thuc hien check neu khong trung email thi inser them user
	let user = user_model.check_insert_users(name, email, password);

	if(user == null){
		res.json({
			message: "Sign up failed, email is created"
		});
	}else{
		res.redirect("/list_user");
	}

});

// lay req tu check_id.ejs
router.get("/do_checkid", function(req,res){
	let form_data = req.query;
	let id = form_data.id;
	console.log(id);

	let user = user_model.check_id(id);
	console.log(user);

	if (user == null){
		res.redirect("/signup");
	}else{
		res.json({
			"user": user
		});
	}
});
module.exports = router;