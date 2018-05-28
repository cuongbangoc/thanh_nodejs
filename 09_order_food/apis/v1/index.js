'use strict';

const express = require('express'),
    router = express.Router();

router.use('/users', require('./users_api'));
router.use('/food_category', require('./foodcategory_api'));

module.exports = router;
