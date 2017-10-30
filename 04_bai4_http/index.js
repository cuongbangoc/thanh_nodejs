const http = require("http");

let server = http.createServer(function(req, res){
	// 1: Tim route
	let url = req.url;
	let route = url.split("?")[0];

	// 2: Query data
	let query = url.split("?")[1];
	console.log(route, query);

	// 3: Method
	let method = req.method;
	console.log(method);

	if(method == "GET" && route == "/admin"){
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write("This is the admin page");
		res.end()
	}else if(method == "GET" && route == "/blog"){
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write("This is the blog page");
		res.end()
	}else if(method == "GET" && route == "/"){
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write("This is the home page");
		res.end()
	}else{
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.write("Not found");
		res.end()
	}
});

server.listen(3000, function(){
	console.log("Running")
});