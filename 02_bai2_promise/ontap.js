const fs = require("fs");

new Promise(function(resolve, reject){
	fs.readFile("data1.txt", function(err, data1){
		if (err){
			reject(err);
		}else{
			resolve(data1);
		}
	});
}).then(function(data1){
	console.log(data1.toString());
	return new Promise(function(resolve, reject){
		fs.readFile("data2.txt", function(err, data2){
			if(err){
				reject(err);
			}else{
				resolve(data2);
			}
		});
	});
}).then(function(data2){
	console.log(data2.toString());
	return new Promise(function(resolve, reject){
		fs.readFile("data3.txt", function(err, data3){
			if (err){
				reject(err);
			}else{
				resolve(data3);
			}
		});
	});
}).then(function(data3){
	console.log(data3.toString());
}).catch(function(err){
	console.log(err);
});