var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
	res.json({"message": "this is Blog page"});
});

module.exports = router;