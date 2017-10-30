const http = require("http");

const server1 = http.createServer(function(req, res){
	res.writeHead(200, {"content-type":"text/plain"});
	res.write("this is the first server");
	res.end();
});

server1.listen(3000, function(){
	console.log("the server is running on port"+3000);
});

const server2 = http.createServer(function(req, res){
	console.log(req);
	res.writeHead(400, {"content-type":"application/json"});
	let obj = {
		"name": "thanh",
		"age": 25
	};
	res.write(JSON.stringify(obj));
	res.end();
});

server2.listen(4000, function(){
	console.log("the server is running on port"+3000);
});

