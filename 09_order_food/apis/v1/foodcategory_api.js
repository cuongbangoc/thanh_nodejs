'use strict';
const express = require('express'),
      foodcategory_repo = require("../../repositories/foodcategory_repository"),
      logger = require('../../helpers/logger'),
      router = express.Router(),
      redis = require("../../helpers/redis_service");

// Add new Food Category
router.post("/create", function(req, res){
    let params = req.body;

    if (!params || !params.name){
        return res.status(406).json({
            error_code: 406,
            message: "missing params"
        });
    }


    // save foodcategory to DB
    let create_foodcategory_data = foodcategory_repo.create(params);
    create_foodcategory_data.then(function(foodcategory){
        if (foodcategory){

            // after save foodcategory to db then get back to data is foodcategory
            // Save foodcategory to redis
            redis.get_conn().set(foodcategory._id.toString(), JSON.stringify(foodcategory));

            // Get to client after save to DB and redis
            res.status(200).json({
                code: 200,
                message: "Create Food Category success",
                foodcategory: foodcategory
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

// Update food category
router.put("/update/:id", function(req, res){
    // console.log("AAAAAAAAAAAAAAAAAAA");
    let params = req.body;
    let id = req.params.id;
    if (!params || !params.name){
        return res.status(406).json({
            error_code: 406,
            message: "Missing Params"
        });
    }

    // Get foodcategory from DB to update
    
    let foodcategory_data_1 = foodcategory_repo.findById(id);
    foodcategory_data_1.then(function(data1){
        if (!data1){
           return res.status(404).json({
                error_code: 404,
                message: "Not found foodcategory to update"
            });
        }else{

            // Update foodcategory
            let foodcategory_data_2 = foodcategory_repo.updateFoodCategory(id, params);
            foodcategory_data_2.then(function(data2){
                if (!data2){
                    res.status(500).json({
                        error_code: 500,
                        message: "Could not update foodcategory"
                    });
                }else{
                    // Get foodcategory updated from DB
                    
                    let foodcategory_data_3 = foodcategory_repo.findById(id);
                    foodcategory_data_3.then(function(data3){
                        if (!data3){
                            return res.status(500).json({
                                error_code: 500,
                                message: "Could not get foodcategory updated"
                            });
                        }else{
                            // After update and save success into DB then save data to redis
                            // Save foodcategory to redis
                            redis.get_conn().set(id, JSON.stringify(data3));
                            return res.status(200).json({
                                code: 200,
                                message: "Update foodcategory success",
                                foodcategory: data3
                            });
                        }
                    });
                }
            }).catch(function(error){
                logger.error(error);
                res.status(500).json({
                    error_code: 500,
                    message: "Error update foodcategory"
                });
            });
        }
    }).catch(function(error){
        logger.error(error);
        res.status(500).json({
            error_code: 500,
            message: "Error get info foodcategory to update"
        });
    });
});

// Delete food category
router.delete("/delete/:id",function(req, res){
    let params = req.body;
    let id = req.params.id;

    // Before must delete foodcategory in redis.
    redis.get_conn().del(id, function(error){
        if (error){
            return res.status(500).json({
                error_code:500,
                message: "could not delete foodcategory from redis"
            });
        }else{
            let foodcategory_data_1 = foodcategory_repo.findById(id);
            foodcategory_data_1.then(function(food){
                if (!food){
                    res.status(404).json({
                        error_code: 404,
                        message: "Not found food category to delete"
                    });
                }else{
                    food.remove(function(error){
                        if (error){
                            logger.error(error);
                            res.status(500).json({
                                error_code:500,
                                message: "Could not delete food category by id"
                            });
                        }else{
                            res.status(200).json({
                                code: 200,
                                message: "Delete success"
                            });
                        }
                    });
                }
            }).catch(function(error){
                logger.error(error);
                res.status(500).json({
                    error_code:500,
                    message: "Error delete food category"
                });
            });
        }
    });    
});

// Get all food category with page and limit
router.get("/get_all", function(req, res){
    let page = req.query.page;
    let limit = parseInt(req.query.limit);
    if (!page){
        page = 1;
    }
    if (!limit){
        limit = 2;
    }
    let skip = (parseInt(page) - 1) * limit;

    let foodcategory_data = foodcategory_repo.find(limit, skip);
    foodcategory_data.then(function(data){
        if (!data){
            res.status(404).json({
                error_code: 404,
                message: "Could not get food category"
            });
        }else{
            res.status(200).json({
                code: 200,
                data: data
            });
        }
    }).catch(function(error){
        // console.log(error);
        logger.error(error);
        res.status(500).json({
            error_code:500,
            message: "Error get all food category"
        });
    });
});

// Get one food category
router.get("/get_one/:id", function(req, res){
    let id = req.params.id;

    // Before get data from redis
    redis.get_conn().get(id, function(error, data){
        if(error){
            logger.error(error);
            console.log("aaaaaaa");
            return res.status(500).json({
                error_code: 500,
                message: "Could not get foodcategory by id"
            });
        }else{
            if(data){
                console.log("BBBBBBBBBBb");
                return res.status(200).json({
                    code: 200,
                    message: "get foodcategory success",
                    foodcategory: JSON.parse(data)
                });
            }else{
                console.log("CCCCCCCCCCcc");
                let foodcategory_data = foodcategory_repo.findById(id);
                foodcategory_data.then(function(food){
                    if (food){
                        res.status(200).json({
                            code: 200,
                            data: food
                        });
                    }else{
                        res.status(404).json({
                            error_code: 404,
                            message: "Not found food category by ID"
                        });
                    }
                }).catch(function(error){
                    logger.error(error);
                    res.status(500).json({
                        error_code: 500,
                        message: "Error get food category with id"
                    });
                });
            }
        }
    });
});
module.exports = router;