var express = require("express");

var router = express.Router();

const user_model = require("../models/users");


router.get("/", function(req, res){
	// Show ra danh sach tat ca cac user co trong model
	res.json({"message":"this is list_user page", "list_user":user_model.get_all_users()}); 
});


module.exports = router;