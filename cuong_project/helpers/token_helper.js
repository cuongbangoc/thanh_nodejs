'use strict';

const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("config");
const crypto = require('crypto');

/**
 * [generate_token description]
 * @param  {Object} user       [description]
 * @param  {string} secret     [description]
 * @param  {Date or String} expired_at [description]
 * @return {string} token           [description]
 */
function generate_token(user) {
    return jwt.sign(user, config.get("jwt.jwt_secret"), {
        expiresIn: config.get("jwt.expired_at"), // default in seconds
        algorithm: config.get("jwt.algorithm")
    });
}

/**
 * [decode_token description]
 * @param  {string} access_token [description]
 * @param  {string} secret       [description]
 * @return {Object} payload      [description]
 */
function verify_token(access_token) {
    return jwt.verify(access_token, config.get("jwt.jwt_secret"), { algorithms: [config.get("jwt.algorithm")] });
}

/**
 * [create_expires_date description]
 * @return {expires_date} [description]
 */
function create_expires_date() {
    var time = config.get("jwt.expired_at");
    var today = moment.utc();
    var expires_at = moment(today).add(time, 'hours').format(config.get('time_format'));

    return expires_at;
}

/**
 * Create hash string md5
 * @param {*} str
 */
function md5(str) {
    return crypto.createHash('md5').update(str).digest("hex");
}

module.exports = {
    generate_token: generate_token,
    verify_token: verify_token,
    create_expires_date: create_expires_date,
    md5: md5
}