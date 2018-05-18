'use strict';
const express = require('express'),
    db = require('../../models'),
    logger = require('../../helpers/logger'),
    router = express.Router();

// get a user by id
router.get('/get/:id', function(req, res) {
    logger.debug('Get User By Id', req.params.id);
    db.User.findOne({
        _id: req.params.id
    }).then(function(user) {
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
    }).catch(function(e) {
        logger.error(e);
        res.status(500).json({
            message: "Error, could not find user",
            error_code: 500
        });
    });
});

// get list of users
router.get('/list/:page/:limit', function(req, res) {
    let limit = (req.params.limit)? parseInt(req.params.limit): 10;
    let skip = (req.params.page)? limit * (req.params.page - 1): 0;
    db.User.count({}, function(err, c) {
        db.User
        .find()
        .skip(skip)
        .limit(limit)
        .sort({'_id': 'desc'})
        .then(function(users) {
            let ret = {
                count: c,
                rows: users
            };
            res.status(200).json({
                message: "success",
                error_code: 200,
                data: ret
            });
        }).catch(function(e) {
            logger.error(e);
            res.status(500).json({
                message: "Error, could not find users",
                error_code: 500
            });
        });
    });
});

module.exports = router;