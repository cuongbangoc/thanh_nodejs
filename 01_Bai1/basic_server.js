var http = require("http"); // goi file da co san "http" mac dinh cua node js.

var server = http.createServer(function(req, res){  // Ham tao server va co mot call back function de hang ket qua khi tao xong server
	// Phan duoi se la nhung phan hoi tu server cho client 
	res.writeHead(200, {"content-type": "text/plain"}); // dinh dang cho noi dung o the body o duoi thong qua the head trong html.
	// content-type : text/plain tuc la kieu text thuan tuy. 
	res.write("Hello, this the first webserver with node js"); // noi dung phan hoi tu server ve client nam o the body
	res.end(); // lenh nay de cho server biet rang da phan hoi het noi dung va de server bat dau chay
});
server.listen(3000, function(){ // lenh de chay server tren cong 3000 voi 1 ham call back function de hang ket qua
	// va tra ve mot message thong bao la server da chay thanh cong. 
	console.log("server running on port 3000");
});

// Vao trinh duyet go dia chi: localhost:3000 hoac may client go diachiIP:3000 thi sex thay noi dung 
// "Hello, this the first webserver with node js". 