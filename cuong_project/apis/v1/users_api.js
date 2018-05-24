// Cái này để làm gì??????

'use strict';
const express = require('express'),
    user_repo = require("../../repositories/user_repository"),

    // Cái này để làm gì ????
    logger = require('../../helpers/logger'),
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
module.exports = router;