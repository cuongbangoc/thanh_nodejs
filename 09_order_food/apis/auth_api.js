'use strict';

const express = require('express'),
    logger = require('../helpers/logger'),
    router = express.Router(),
    config = require('config'),
    token_repo = require("../repositories/token_repository"),
    user_repo = require("../repositories/user_repository");

let password_helper = require("../helpers/password_helper");
let token_helper = require("../helpers/token_helper");

// Signin
router.post("/login", function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    // Check parameters
    if(!email || !password){
        return res.status(406).json({
            error_code: 406,
            message: "Missing parameters"
        });
    }

    // Get User by Email
    let user_data = user_repo.findByEmail(email);
    user_data.then(function(user) {
        if (!user) {
            return res.status(404).json({
                error_code: 404,
                message: "User not found"
            });
        }

        // Check password
        let is_valid_password = password_helper.compare_password(password, user.password);
        if (!is_valid_password) {
            return res.status(406).json({
                error_code: 406,
                message: "Password invalid"
            });
        }

        // Create Token with user information
        user = user.toObject();
        delete user.password;
        let access_token = token_helper.generate_token(user);
        let token = {
            user: user._id,
            token: access_token
        };

        // Save token to DB
        let create_token_data = token_repo.create(token);

        create_token_data.then(function (new_token) {
            return res.status(200).json({
                error_code: 200,
                token: access_token
            });
        }).catch(function (e) {
            logger.error(e);
            res.status(500).json({
                error_code: 500,
                message: "Error, could not create token"
            });
        });
    }).catch(function (e) {
        logger.error(e);
        res.status(500).json({
            error_code: 500,
            message: "Error, Could not get user by email"
        });
    });
});


// Singnup
router.post("/register", function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let retypepassword = req.body.retypepassword;

    if(!email || !password){
        return res.status(406).json({
            error_code: 406,
            message: "Missing parameters"
        });
    }else{
        if (password != retypepassword){
            return res.status(406).json({
                error_code: 406,
                message: "password is not match"
            });
        }
    }

    let user_data = user_repo.findByEmail(email);
    user_data.then(function (user) {
        if (user) {
            return res.status(404).json({
                error_code: 404,
                message: "User is exists"
            });
        }else{
            let saltRounds = config.get("salt_factor");
            let salt = password_helper.get_salt(saltRounds);
            let hash = password_helper.hash_password(password, salt);

            let new_user = {
                email: email,
                password: hash
            };

            let create_user_data = user_repo.create(new_user);

            create_user_data.then(function(u) {
                return res.status(200).json({
                    error_code: 200,
                    message: "Success"
                });
            });
        }
    }).catch(function (e) {
        logger.error(e);
        res.status(500).json({
            error_code: 500,
            message: "Could not find user by email"
        });
    });
});

module.exports =router;
