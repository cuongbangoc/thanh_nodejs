'use strict';

const express = require('express'),
    logger = require('../helpers/logger'),
    router = express.Router(),
    config = require('config'),
    db = require('../models');

let password_helper = require("../helpers/password_helper");
let token_helper = require("../helpers/token_helper");

router.post("/login", function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password){
        return res.status(406).json({
            error_code: 406,
            message: "Missing parameters"
        });
    }

    db.User.findOne({
        email: email
    }, "_id email firstname lastname password")
    .then(function (user) {
        if(!user){
            return res.status(404).json({
                error_code: 404,
                message: "User not found"
            });
        }
        let is_valid_password = password_helper.compare_password(password, user.password);
        if (!is_valid_password) {
            return res.status(406).json({
                error_code: 406,
                message: "Password invalid"
            });
        }

        user = user.toObject();
        delete user.password;
        let access_token = token_helper.generate_token(user);
        let token = new db.Token({
            user: user._id,
            token: access_token
        });

        token.save().then(function(new_token) {
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

router.post("/register", function(req, res) {
    let email = req.body.email;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let password = req.body.password;

    if(!email || !password){
        return res.status(406).json({
            error_code: 406,
            message: "Missing parameters"
        });
    }

    db.User.findOne({
        email: email
    }).then(function (user) {
        if (user) {
            return res.status(404).json({
                error_code: 404,
                message: "User is exists"
            });
        }else{
            let saltRounds = config.get("salt_factor");
            let salt = password_helper.get_salt(saltRounds);
            let hash = password_helper.hash_password(password, salt);

            let new_user = new db.User({
                email: email,
                password: hash,
                firstname: firstname,
                lastname: lastname
            });

            new_user.save().then(function(u) {
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
