const http = require("http");

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
// const server = http.createServer(function(req, res){
//     res.writeHead(200, {"Content-Type": "application/json"});

//     let user = {
//         name: "Thanh",
//         age: 18
//     };

//     res.write(JSON.stringify(user));
//     res.end();
// });

// server.listen(3000, function(){
//     console.log("Server is running on port 3000");
// });


// Bai Tap
// 1: Viet 1 server tra ve 1 trang html co 1 input nhap ten va 1 button submit
// 2: Viet 1 server JSON tra ve thong tin hocsinh: ten, tuoi, lop, truong, khoa