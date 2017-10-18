//const http = require("http");

// Bai 1: Tao server web binh thuong
// const server = http.createServer(function(req, res){
//     res.writeHead(200, {"Content-Type": "text/plain"});

//     res.write("<h1> Hello </h1>");
//     res.end();
// });

// server.listen(3000, function(){
//     console.log("Server is running on port 3000");
// });

// Bai 2: Tao server API with JSON data

// const http = require("http"); // gọi file http đã có sẵn
// const server = http.createServer(function(req, res){ // Tạo server.
//     res.writeHead(200, {"Content-Type": "application/json"}); // Định dạng phản hồi của server lưu ý kiểu là aplication/json

//     let user = {         // Tạo 1 đối tượng để trả về cho client
//         name: "Thanh",
//         age: 18
//     };

//     res.write(JSON.stringify(user)); // trả về cho client đối tượng user đã được tạo.
//     res.end();
// });

// server.listen(3000, function(){      // Chạy server trên cổng 3000 và có callback function để báo chạy thành công
//     console.log("Server is running on port 3000");
// });


// Bai Tap
// 1: Viet 1 server tra ve 1 trang html co 1 input nhap ten va 1 button submit
// 2: Viet 1 server JSON tra ve thong tin hocsinh: ten, tuoi, lop, truong, khoa

// Bai 1:
// const http = require("http");
// const server1 = http.createServer(function(req, res){
// 	res.writeHead(200, {"content-type": "text/html"});
// 	res.write("<input type='text' value='' id='name'>");
// 	res.write("<input type='submit' name='submit' id='submit'>");
// 	res.end();
// });

// server1.listen(3000, function(){
// 	console.log("server is running on port 3000");
// });

// Bai 2:
const http = require("http");
const server2 = http.createServer(function(req, res){
	res.writeHead(200, {"conten-type": "aplication/json"});
	let student = {
		"name": "thanh",
		"age": 25,
		"class": 10,
		"school": "nuce",
		"major": "engineering"
	};
	res.write(JSON.stringify(student));
	res.end();
});
server2.listen(3000, function(err, listen){
	if (err){
		console.log("server is not running");
	}else {
		console.log("server is running on port 3000");
	}
});

