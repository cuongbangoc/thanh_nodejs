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


function get_user_by_email_and_password(email, password){
    for(let i = 0; i < users.length; i++){
        // Tim user
        if(users[i].email == email && users[i].password == password){
            return users[i];
        }
    }

    return null;
}


const user_model = {};
user_model.get_user_by_email_and_password = get_user_by_email_and_password;

module.exports = user_model;