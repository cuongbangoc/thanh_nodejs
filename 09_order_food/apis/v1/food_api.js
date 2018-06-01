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

// Update food
router.put("/update/:id", function(req, res){
    let params = req.body;
    let id = req.params.id;

    let food_data = food_repo.findById(id);
    food_data.then(function(food){
        if (!food){
            res.status(404).json({
                error_code: 404,
                message: "Not found food by id"
            });
        }else{
            if (!params){
               res.status(200).json({
                   code: 200,
                   message: "Update food success",
                   food: food
               });
            }else{
                if (params.name){
                    food.name = params.name;
                }             
                if (params.food_category){
                    food.food_category = params.food_category;
                }
                if (params.price){
                    food.price = params.price;
                }
                if (params.image){
                    food.image = params.image;
                }
                if (params.description){
                    food.description = params.description;
                }
                food.save(function(error){
                    if (error){
                        logger.error(error);
                        res.status(500).json({
                            error_code: 500,
                            message: "Could not update food"
                        });
                    }else{
                        res.status(200).json({
                            code: 200,
                            message: "Update food success",
                            food: food
                        });
                    }
                });
            } 
        }
    }).catch(function(error){
        logger.error(error);
        res.status(500).json({
            error_code:500,
            message: "Error update food"
        });
    });
});

// Get one food
router.get("/get_one/:id", function(req, res){
    let id = req.params.id;

    let food_data = food_repo.findById(id);
    food_data.then(function(food){
        if (!food){
            res.status(404).json({
                error_code: 404,
                message: "Not found food with by id"
            });
        }else{
            res.status(200).json({
                code: 200,
                message: "Found food success",
                data: food
            });
        }
    }).catch(function(error){
        logger.error(error);
        res.status(500).json({
            error_code:500,
            message: "Error get info food by id"
        });
    });
});

// Get all list food with page and limit
router.get("/get_All", function(req, res){
    let page = req.query.page;
    let limit = parseInt(req.query.limit);

    if (!page){
        page = 1;
    }
    if (!limit){
        limit = 2;
    }
    let skip = (parseInt(page)-1)*limit;

    let food_data = food_repo.find(limit, skip);
    food_data.then(function(data){
        if (!data){
            res.status(404).json({
                error_code: 404,
                message: "Could not get list food"
            });
        }else{
            res.status(200).json({
                code: 200,
                message: "Get list food success",
                data: data
            });
        }
    }).catch(function(error){
        logger.error(error);
        res.status(500).json({
            error_code:500,
            message: "Error get list food"
        });
    });
});
module.exports = router;