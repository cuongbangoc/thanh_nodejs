var express = require("express");

var router = express.Router();
router.use("/admin", require(__dirname+"/admin.js"));
router.use("/blog", require(__dirname+"/blog.js"));

router.get("/", function(req, res){
	let query = req.query;
	console.log(req.url);
	console.log(query);
	// res.json({"message":"this is home page"});
	res.render("test"); // render file test.ejs sang html de tra ve client
});

router.get("/:name", function(req, res){
	let params = req.params;
	console.log(req.url);
	console.log(params);
	res.json({"message":"this is home page"});
});

module.exports = router;