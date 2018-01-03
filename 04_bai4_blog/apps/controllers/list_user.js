var express = require("express");

var router = express.Router();

const user_model = require("../models/users");

router.get("/", function(req, res){
	let promise_user = user_model.get_all_users();

	promise_user.then(function(users){
		res.json({
			"message":"this is list_user page",
			"users":users
		});
	}).catch(function(err){
		res.json({
			message: "Loi me roi"
		});
	});
	// Show ra danh sach tat ca cac user co trong model
});


module.exports = router;