'use strict';
const express = require('express'),
    user_repo = require("../../repositories/user_repository"),
    logger = require('../../helpers/logger'),
    router = express.Router();

// get a user by id
router.get('/get/:id', function(req, res) {
    logger.debug('Get User By Id', req.params.id);

    let id = req.params.id;
    let user_data = user_repo.findById(id);
    user_data.then(function(user) {
        // remove security attributes
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
    let limit = (req.query.limit) ? parseInt(req.query.limit): 10;
    let skip = (req.query.page) ? limit * (req.query.page - 1): 0;

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

module.exports = router;