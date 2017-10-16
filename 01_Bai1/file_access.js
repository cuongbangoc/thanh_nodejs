var fs = require("fs");

// mo file data.txt 
fs.open("data.txt", "r+", function(err, file){
	if(err){
		console.log("open file is error");
		return;
	}

	console.log("open file is successfully");
});

// read file:
// read file dong bo
// var data = fs.readFileSync("data.txt");
// console.log(data.toString());


// read file khong dong bo
fs.readFile("data.txt", function(err, data){
	if (err){
		console.log("Error read file");
	}else {
		console.log(data.toString());
	}
});


// Ghi file
fs.writeFile("data.txt", "new content file", function(err, file){
	if (err){
		console.log("write file error");
	}else{
		fs.readFile("data.txt", function(err, data){
			if (err){
				console.log("read file error");
			}else{
				console.log(data.toString());
			}
		})
	}
});

// tao folder moi,
fs.mkdir("ten folder muon dat", function(err){
	if (err){
		console.log("make folder error");
	}else{
		console.log("make folder success");
	}
})