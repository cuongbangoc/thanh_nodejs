'user trict'

const express = require("express"),
      logger = require("../../helpers/logger"),
      restaurant_repo = require("../../repositories/restaurant_reposiroty"),
      router = express.Router();

// Add new restaurant
router.post("/create", function(req, res){
      let params = req.body;

      if (!params || !params.name){
            return res.status(406).json({
                  error_code: 406,
                  message: "Missing params"
            });
      }

      let restaurant_data = restaurant_repo.create(params);
      restaurant_data.then(function(restaurant){
            if (!restaurant){
                  res.status(500).json({
                        error_code: 500,
                        message: "Could not create new restaurant"
                  });
            }else{
                  res.status(200).json({
                        code: 200,
                        message: "Create new restaurant success",
                        data: restaurant
                  });
            }
      }).catch(function(error){
            logger.error(error);
            res.status(500).json({
                  error_code:500,
                  message: "Error create new restaurant"
            });
      });
});


// Update restaurant
router.put("/update/:id", function(req, res){
      let id = req.params.id;
      let params = req.body;

      if (!id){
            return res.status(406).json({
                  error_code: 406,
                  message: "id do not exist"
            });
      }
      let restaurant_data = restaurant_repo.findById(id);
      restaurant_data.then(function(restaurant){
            if (!restaurant){
                  res.status(404).json({
                        error_code: 404,
                        message: "Not found restaurant by id"
                  });
            }else{
                 if (!params){
                       return res.status(200).json({
                             code: 200,
                             message: "update restaurant success",
                             data: restaurant
                       });
                 }else{
                       if (params.name){
                             restaurant.name = params.name;
                       }
                       if (params.address){
                             restaurant.address = params.address;
                       }
                       if (params.rating){
                             restaurant.rating = params.rating;
                       }
                       if (params.image){
                             restaurant.image = params.image;
                       }
                       if (params.food){
                             restaurant.food = params.food;
                       }
                       if (params.description){
                             restaurant.description = params.description;
                       }
                       restaurant.save(function(error){
                             if (error){
                                   logger.error(error);
                             }else{
                                    res.status(200).json({
                                          code: 200,
                                          message: "update restaurant success",
                                          data: restaurant
                                    });
                             }                      
                       });
                 }  
            }
      }).catch(function(error){
            logger.error(error);
            res.status(500).json({
                  error_code: 500,
                  message: "Error update restaurant"
            });
      });
});

// Delete restaurant
router.delete("/delete/:id", function(req, res){
      let id = req.params.id;
      let restaurant_data1 = restaurant_repo.findById(id);
      restaurant_data1.then(function(restaurant){
            if (!restaurant){
                  res.status(404).json({
                        error_code: 404,
                        message: "Not found restaurant"
                  });
            }else{
                  let restaurant_data2 = restaurant_repo.delete(id);
                  restaurant_data2.then(function(data){
                        if (!data){
                              res.status(500).json({
                                    error_code: 500,
                                    message: "Could not delete restaurant"
                              });
                        }else{
                              res.status(200).json({
                                    code: 200,
                                    message: "Delete restaurant success"
                              });
                        }
                  }).catch(function(error){
                        logger.error(error);
                        res.status(500).json({
                              error_code:500,
                              message: "Error delete restaurant"
                        });
                  });
            }
      }).catch(function(error){
            logger.error(error);
            res.status(500).json({
                  error_code: 500,
                  message: "Error get restaurant by id"
            });
      });
});

// Get one restaurant
router.get("/get_one/:id",function(req,res){
      let id = req.params.id;
      let restaurant_data = restaurant_repo.findById(id);
      restaurant_data.then(function(restaurant){
            if (!restaurant){
                  res.status(404).json({
                        error_code: 404,
                        message: "Could not get restaurant"
                  });
            }else{
                  res.status(200).json({
                        code: 200,
                        message: "get restaurant success",
                        data: restaurant
                  });
            }
      }).catch(function(error){
            logger.error(error);
            res.status(500).json({
                  error_code: 500,
                  message: "Error get restaurant"
            });
      });
});

// Getall restaurant
router.get("/get_all", function(req, res){
      let page = parseInt(req.query.page);
      let limit = parseInt(req.query.limit);

      if (!page){
            page = 1;
      }
      if (!limit){
            limit = 1;
      }
      let skip = (page-1)*limit;
      let restaurant_data = restaurant_repo.find(limit, skip);
      restaurant_data.then(function(data){
            if (!data){
                  res.status(404).json({
                        error_code:404,
                        message: "Could not get restaurant"
                  });
            }else{
                  res.status(200).json({
                        message: 200,
                        data: data
                  });
            }
      }).catch(function(error){
            logger.error(error);
            res.status(500).json({
                  error_code: 500,
                  message: "Error get all restaurant"
            });
      });
});
module.exports = router;