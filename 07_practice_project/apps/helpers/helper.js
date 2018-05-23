var bcrypt = require("bcrypt");

var config = require("config");

//nhan vao mot string pass va tra ve hash
function hash_password (password){
	var saltRounds = config.get("salt");

	//general ra key de luu pass
	var salt = bcrypt.genSaltSync(saltRounds);

	//ma hoa pass thanh hash boi 1 cai key co do dai la 10
	var hash = bcrypt.hashSync(password, salt);

	return hash;
}

function compare_password(password, hash){
	return true
}


module.exports = {
	hash_password: hash_password,
	compare_password: compare_password
}