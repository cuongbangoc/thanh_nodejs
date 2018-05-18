'use strict';
const db = require('../models');
const _ = require('lodash');
const config = require('config');
const logger = require('../helpers/logger');
const token_helper = require("../helpers/token_helper");

module.exports = function(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }

    let unauthorization = config.get('unauthorization');
    if (_.indexOf(unauthorization, req.url) < 0) {
        let t = req.get('Authorization');
        if (!t) {
            logger.debug('Access Denied', req.url);
            return res.status(401).json({
                message: "Access Denied",
                error_code: 401
            });
        }
        t = t.replace('Bearer ', '');
        db.Token.findOne({
            token: t
        }).then(function(token) {
            if (!token) {
                logger.debug('Access Denied', req.url);
                return res.status(401).json({
                    message: "Access Denied",
                    error_code: 401
                });
            }else{
                let user = token_helper.verify_token(t);
                req.user = user;
                return next();
            }
        }).catch(function(e) {
            logger.error(e);
            logger.debug('Access Denied %s !!!', t);
            return res.status(401).json({
                message: "Access Denied, Token is expired",
                error_code: 401
            });
        });
    } else {
        return next();
    }
};