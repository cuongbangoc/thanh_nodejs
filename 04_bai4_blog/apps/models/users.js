// Database <=> MYSQL
// Tam thoi su dung mang thay cho database
var users = [
    {
        "name": "Thanh Ba Ngoc",
        "email": "thanhbangoc@gmail.com",
        "password": "123456"
    },
    {
        "name": "Cuong Ba Ngoc",
        "email": "cuongbangoc@gmail.com",
        "password": "12345678"
    }
];

// Ham tim va lay ra user theo email va pass
function get_user_by_email_and_password(email, password){
    for(let i = 0; i < users.length; i++){
        // Tim user
        if(users[i].email == email && users[i].password == password){
            return users[i];
        }
    }

    return null;
}

// Insert them user
function insert_users(name, email, password){
    users.push({
        "name": name,
        "email": email,
        "password": password
    });
}

// Kiem tra xem neu khong trung email thi insert them euser
function check_insert_users(name, email, password){
    for (let i = 0; i< users.length; i++){
        if (users[i].email == email){
            return null;
        }
    }
    users.push({
        "name": name,
        "email": email,
        "password": password
    });
    return users;
}

// lay tat ca user ra
function get_all_users(){
    return users;
}


const user_model = {};
user_model.get_user_by_email_and_password = get_user_by_email_and_password;
user_model.get_all_users = get_all_users;
user_model.insert_users = insert_users;
user_model.check_insert_users = check_insert_users;

module.exports = user_model;