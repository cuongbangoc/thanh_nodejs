var config = require("config");

var mysql = require("mysql");

const connection = mysql.createConnection({
	host: config.get("mysql.host"),
	user: config.get("mysql.user"),
	password: config.get("mysql.password"),
	database: config.get("mysql.database")
})

connection.connect(function(err){   // call back function để xem connect có thành công không
    if(err){
        console.log(err);
        console.log("Ket noi CDSL that bai");
    }else{
        console.log("Ket noi thanh cong CSDL");
    }
});

function getConnection (){
	if (!connection){
		connection.connect()
	}
	return connection;
}

module.exports = {
	getConnection: getConnection
}