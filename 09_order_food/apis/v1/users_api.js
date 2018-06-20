// Cái này để làm gì??????

'use strict';
const express = require('express'),
      user_repo = require("../../repositories/user_repository"),
      password_helper = require("../../helpers/password_helper"),

    // Cái này để làm gì ????
      logger = require('../../helpers/logger'),
      config = require('config'),
      router = express.Router();

// get a user by id
router.get('/get/:id', function(req, res) {

    // Cái này để làm gì??
    logger.debug('Get User By Id', req.params.id);

    let id = req.params.id;
    let user_data = user_repo.findById(id);
    user_data.then(function(user) {

        // remove security attributes

        // Cái này để làm gì???
        // => Chuyen tu Object Mongoose sang Object Javascript
        user = user.toObject();
        if (user) {
            delete user.password;
        }
        res.status(200).json({
            message: "Success",
            error_code: 200,
            user: user
        });
    }).catch(function (e) {
        logger.error(e);
        res.status(500).json({
            message: "Error, could not find user",
            error_code: 500
        });
    });
});

// get list of users
router.get('/list', function(req, res) {

    // Cái này để làm gì???
    // let limit = (req.query.limit) ? parseInt(req.query.limit): 10;
    // let skip = (req.query.page) ? limit * (req.query.page - 1): 0;

    let user_data = user_repo.findAll();
    user_data.then(function(users) {
        res.status(200).json({
            message: "success",
            error_code: 200,
            users: users
        });
    }).catch(function (e) {
        logger.error(e);
        res.status(500).json({
            message: "Error, could not find users",
            error_code: 500
        });
    });
});


// Update User
router.put('/update', function(req, res){
    let params = req.body;
    // console.log(req.user);
    let user = req.user;
    let user_data = user_repo.updateUser(user, params);
    user_data.then(function(user1){
        if (user1){
            let user_got = user_repo.findById(user._id);
            user_got.then(function(user2){
                res.status(200).json({
                    message: "success",
                    user: user2
                });
            }).catch(function(error){
                if (error){
                    logger.error(error);
                    res.status(500).json({
                         message: "loi roi"
                    });
                }
            });
        }
    }).catch(function(error){
        if (error){
            logger.error(error);
            res.status(500).json({
                message: "loi roi",
            });
        }
    });
});

// Lay thong tin cua chinh minh
router.get("/me", function(req, res){
    let user = req.user;
    let user_data = user_repo.findById(user._id);
    user_data.then(function(user){

        
        if (user){
            user = user.toObject();
            delete user.password;
            res.status(200).json({
                message: "success",
                user: user
            });
        }
    }).catch(function(error){
        logger.error(error);
        res.status(500).json({
           message: "loi roi"
        });
    });
});

// Đổi password User
router.post("/change_password", function(req, res){
    // Lay req
    let old_password = req.body.old_password;
    let new_password = req.body.new_password;
    let retype_new_password = req.body.retype_new_password;
    let user = req.user;

    // Check params req
    if (!old_password || !new_password || !retype_new_password){
        return res.status(406).json({
            error_code: 406,
            message: "Missing params"
        });
    }else {
        // check new pass and retype
        if (new_password != retype_new_password){
            return res.status(406).json({
                error_code: 406,
                message: "New password is not match"
            });
        }
    }

    // get info user to change password
    let user_data = user_repo.findById(user._id);
    user_data.then(function(user){
        if (!user){
            return res.status(404).json({
                error_code: 404,
                message: "Not Found user"
            });
        }
        // Check password
        let is_valid_password = password_helper.compare_password(old_password, user.password);
        if (!is_valid_password){
            res.status(406).json({
                error_code: 406,
                message: "Password invalid"
            });
        }
        // Hash new_password
        let saltRounds = config.get("salt_factor");
        let salt = password_helper.get_salt(saltRounds);
        let hash = password_helper.hash_password(new_password, salt);

        // Update hash repalce password in DB
        let new_user = user_repo.changePassword(user, hash);
        new_user.then(function(user1){
            if (user1){
                res.status(200).json({
                    code: 200,
                    message: "Change password success"
                });
            }else{
                res.status(500).json({
                    error_code: 500,
                    message: "Do not change password"
                });
            }
        }).catch(function(error){
            res.status(500).json({
                error_code: 500,
                message: "loi phan update pass"
            });
        });
    }).catch(function(error){
        logger.error(error);
        res.status(500).json({
            error_code: 500,
            message: "loi roi get user by id"
        });
    });
});
module.exports = router;
