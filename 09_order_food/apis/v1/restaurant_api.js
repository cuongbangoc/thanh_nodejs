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
module.exports = router;