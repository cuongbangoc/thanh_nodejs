'use strict';
const express = require('express'),
      food_repo = require("../../repositories/food_repository"),
      logger = require('../../helpers/logger'),
      router = express.Router();

// Add new food
router.post("/create", function(req, res){
    let params = req.body;

    if (!params || !params.name){
        return res.status(406).json({
            error_code: 406,
            message: "missing params"
        });
    }
    let food_data = food_repo.create(params);
    food_data.then(function(food){
        if (food){
            res.status(200).json({
                code: 200,
                message: "Create food success"
            });
        }else{
            res.status(500).json({
                error_code: 500,
                message: "Could not create new food"
            });
        }
    }).catch(function(error){
        logger.error(error);
        res.status(500).json({
            error_code: 500,
            message: "Error create new food"
        });
    });
});

module.exports = router;