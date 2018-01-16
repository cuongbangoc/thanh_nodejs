var db = require("../common/database.js");

var conn = db.getConnection();

function addUser (user){
     if(user){
        return new Promise (function(resole, reject){
            let query = conn.query('INSERT INTO users SET ?', user, function(err, results, fields){
                if (err){
                    reject(err);
                }else{
                    resole(results.insertId);
                }
            });
        });
     }else{
        return false
     }
}

module.exports = {
    addUser: addUser
}