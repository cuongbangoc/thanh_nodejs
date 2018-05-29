'use strict';
const express = require('express'),
      foodcategory_repo = require("../../repositories/foodcategory_repository"),
      logger = require('../../helpers/logger'),
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
    let foodcategory_data_1 = foodcategory_repo.findById(id);
    foodcategory_data_1.then(function(data1){
        if (!data1){
           return res.status(404).json({
                error_code: 404,
                message: "Not found foodcategory to update"
            });
        }else{
            let foodcategory_data_2 = foodcategory_repo.updateFoodCategory(id, params);
            foodcategory_data_2.then(function(data2){
                if (!data2){
                    res.status(500).json({
                        error_code: 500,
                        message: "Could not update foodcategory"
                    });
                }else{
                    let foodcategory_data_3 = foodcategory_repo.findById(id);
                    foodcategory_data_3.then(function(data3){
                        if (!data3){
                            res.status(404).json({
                                error_code: 404,
                                message: "Not found foodcategory updated"
                            });
                        }else{
                            res.status(200).json({
                                code: 200,
                                data: data3
                            });
                        }
                    }).catch(function(error){
                        logger.error(error);
                        res.status(500).json({
                            error_code: 500,
                            message: "Error get info foodcategory updated"
                        });
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
module.exports = router;