// cai routing
var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");

var app = express();
// body parser
app.use(bodyParser.json()); // de lay du lieu trong body cua post method, lay du lieu trong form

app.set("views", __dirname+"/apps/views"); // cai dat folder "views" vao duong dan tuyet doi apps/views
app.set("view engine", "ejs"); // cai dat ejs lam engine

// Static
app.use("/static", express.static(__dirname+"/public"));// neu co duong dan /static thi truy cap vao folder public de tim file static

var controller = require(__dirname+"/apps/controllers"); // dirname: tra ve vi tri file dang code la app.js va include no vao controllers

app.use(controller);

var host = config.get("server.host");
var port = config.get("server.port");

app.listen(port, host, function(){
	console.log("app is running on port", port);
});