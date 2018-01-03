// Database <=> MYSQL
// Tam thoi su dung mang thay cho database
// var users = [
//     {
//         "id" : 1,
//         "name": "Thanh Ba Ngoc",
//         "email": "thanhbangoc@gmail.com",
//         "password": "123456"
//     },
//     {
//         "id" : 2,
//         "name": "Cuong Ba Ngoc",
//         "email": "cuongbangoc@gm9ail.com",
//         "password": "12345678"
//     }
// ];

const mysql = require("mysql"); // gọi hàm mysql


const connection = mysql.createConnection({  // Kết nối code với mysql trên database
  host     : '127.0.0.1', // địa chỉ http hoặc ip
  port     : 3306,        // cổng nghe
  user     : 'kaiko_user',  // user để truy cập
  password : '12345678',     // pass để truy cập
  database : 'kaiko'         // database muốn truy cập
});

connection.connect(function(err){   // call back function để xem connect có thành công không
    if(err){
        console.log(err);
        console.log("Ket noi CDSL that bai");
    }else{
        console.log("Ket noi thanh cong CSDL");
    }


});


// Ham tim va lay ra user theo email va pass
function get_user_by_email_and_password(email, password){

    let user = {
        email: email,
        password: password
    };
    return new Promise(function(resolve, reject){
        // select * from user where email = "thaoabc@gmail.com AND password = 123456
        let query = connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields){
            if (error){
                console.log(error);
                reject(error);
            }else{
                console.log(results);
                if (results.length > 0){
                    resolve(results);
                }else{
                    resolve(null);
                }
            }
        });
    });
    // for(let i = 0; i < users.length; i++){
    //     // Tim user
    //     if(users[i].email == email && users[i].password == password){
    //         return users[i];
    //     }
    // }

    // return null;
}

// Insert them user
// INSERT INTO users (name, email, password) VALUES ("ba ngoc thanh", "thanhbangoc@gmail.com", "thanh123");
function insert_users(name, email, password){
   

    let user = {
        name: name,
        email: email,
        password: password
    };

// dùng promise để hứng kết quả của hàm insert_users do nếu return nhiều lần sẽ thành call back hell
    return new Promise(function(resolve, reject){  
        let query = connection.query('INSERT INTO users SET ?', user, function (error, results, fields) {
          if (error){
             reject(error);
          }else{
            resolve(results.insertId);
          }
          // Neat!
        });
    });

    
}

// Kiem tra xem neu khong trung email thi insert them euser
function check_insert_users(name, email, password){

    let user = {
        name: name,
        email: email,
        password: password
    };
    return new Promise(function(resolve, reject){
        let query = connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
            if (error){
                reject(error);
            }else{
                if (results.length > 0){
                    resolve(null);
                }else{
                     let query = connection.query('INSERT INTO users SET ?', user, function (error, results, fields) {
                        if (error){
                             reject(error);
                        }else{
                             resolve(results.insertId);
                        }
                     }); 
                }
                
               

            }
        });

    });
 }

// lay tat ca user ra
function get_all_users(){
    return new Promise(function(resolve, reject){
        let query = connection.query('SELECT * FROM users', [], function(error,results,fields) {
             if (error){
                reject(error);
             }else{
                resolve(results);
             }
        });
    });
}


// ham check id user
function check_id(id){
    for (let i = 0; i< users.length; i++){
        if (users[i].id == id){
            return users[i];
        }
    }
    return null;
}

// ham update user
function update_user(id, name, email, password){
    for (let i = 0; i< users.length; i++){
        if (users[i].id == id){
            users.splice(i, 1);
            return users;
        }
    }
    return null;
}

// ham tim email:
function find_email(name){
    for (let i = 0; i<users.length; i++){
        if (users[i].name == name){
            return users[i];
        }
    }
    return null;
}

const user_model = {};
user_model.get_user_by_email_and_password = get_user_by_email_and_password;
user_model.get_all_users = get_all_users;
user_model.insert_users = insert_users;
user_model.check_insert_users = check_insert_users;
user_model.check_id = check_id;
user_model.update_user = update_user;
user_model.find_email = find_email;

module.exports = user_model;