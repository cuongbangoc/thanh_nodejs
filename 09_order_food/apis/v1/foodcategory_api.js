'use strict';
const express = require('express'),
      foodcategory_repo = require("../../repositories/foodcategory_repository"),
      router = express.Router();

// Add new Food Category
router.post("/create", function(req, res){
    let params = req.body;

    if (!params || !params.name){
        return res.status(406).json({
            error_code: 406,
            message: "missing params"
        });
    }
    let create_foodcategory_data = foodcategory_repo.create(params);
    create_foodcategory_data.then(function(food){
        if (food){
            res.status(200).json({
                code: 200,
                message: "Create Food Category success"
            });
        }else{
            res.status(500).json({
                error_code: 500,
                message: "Could not create food category"
            });
        }
    }).catch(function(error){
        res.status(500).json({
            error_code: 500,
            message: "Create Food Category error"
        });
    });
});

module.exports = router;