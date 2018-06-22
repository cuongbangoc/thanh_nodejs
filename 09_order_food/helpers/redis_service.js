'use trict'
var config = require("config");
var redis = require("redis");

let connection = redis.createClient(config.get("redis.port"), config.get("redis.host"));

function get_conn(){
	if (!connection){
		connection = redis.createClient(config.get("redis.port"), config.get("redis.host"));
	}
	return connection;
}

module.exports = {
	get_conn: get_conn
}
		
 
