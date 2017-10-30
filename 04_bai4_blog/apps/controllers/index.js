var express = require("express");

var router = express.Router();

const user_model = require("../models/users");
router.use("/admin", require(__dirname+"/admin.js"));
router.use("/blog", require(__dirname+"/blog.js"));

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
        res.redirect("/admin");
    }
});

router.get("/", function(req, res){
	res.json({"message":"this is home page"});
});

module.exports = router;