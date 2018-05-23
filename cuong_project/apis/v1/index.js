'use strict';

const express = require('express'),
    router = express.Router();

router.use('/users', require('./users_api'));
router.use('/lophocs', require('./lophoc_api'));

module.exports = router;
