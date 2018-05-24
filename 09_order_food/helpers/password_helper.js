'use strict';

const bcrypt = require('bcrypt-nodejs');
const config = require("config");

/**
 * [hash_password description]
 * @param  {String} password [description]
 * @param  {string} salt     [description]
 * @return {string} hash_password [description]
 */
function hash_password(password, salt){
    let hash = bcrypt.hashSync(password, salt);
    return hash;
}

/**
 * [get_salt description]
 * @param  {number} salt_factor [description]
 * @return {string} salt        [description]
 */
function get_salt(salt_factor){
    let salt = bcrypt.genSaltSync(salt_factor);
    return salt;
}

/**
 * [compare_password description]
 * @param  {string} password [raw_password]
 * @param  {string} hash_password    [hash_password]
 * @return {boolean}          [description]
 */
function compare_password(password, hash){
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    get_salt: get_salt,
    hash_password: hash_password,
    compare_password: compare_password
}