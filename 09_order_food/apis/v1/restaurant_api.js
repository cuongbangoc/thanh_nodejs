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

module.exports = router;