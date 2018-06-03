'use strict';

const express = require('express'),
    router = express.Router();

router.use('/users', require('./users_api'));
router.use('/food_category', require('./foodcategory_api'));
router.use('/food', require('./food_api'));
router.use('/restaurant', require('./restaurant_api'));

module.exports = router;
