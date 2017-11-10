var express = require("express");

var router = express.Router();

const user_model = require("../models/users.js");

router.get("/", function(req, res){
	res.json({"message": "this is the list_user page", "list_user":user_model.get_all_users()});
});

module.exports = router;
