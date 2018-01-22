var bcrypt = require ("bcryptjs");

var config = require("config");

function hash_password (password){
	var saltRounds = config.get("salt");
	var salt = bcrypt.genSaltSync(saltRounds);
	var hash = bcrypt.hashSync(password, salt);

	return hash;
}

function compare_password(password, hash){
	return bcrypt.compareSync(password, hash); // return true neu hash chua password, va return false neu khong chua password
}

module.exports = {
	hash_password: hash_password,
	compare_password: compare_password
}