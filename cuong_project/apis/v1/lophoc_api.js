'use trict';
const express = require("express"),
    lophoc_repo = require("../../repositories/lophoc_repository"),
    logger = require("../../helpers/logger"),
    router = express.Router();

// Get lophoc by ID
router.get("/get/:id", function(req, res){
    logger.debug("Get Lop hoc By ID", req.params.id);
    let id = req.params.id;
    let lophoc_data = lophoc_repo.findById(id);
    lophoc_data.then(function(lophoc){
        lophoc = lophoc.toObject();
        if (lophoc){
            for (let i=0; i< lophoc.user_id.length; i++){
                delete lophoc.user_id[i].password;
            }
        }

        res.status(200).json({
            message: "success",
            error_code: 200,
            lophoc: lophoc
        });
    }).catch(function(error){
        logger.error(error);
        console.log(error);
        res.status(500).json({
            message: "Error",
            error_code: 500,           
        });
    });
});

// Get list of lop hoc
// B1: Client truyen url cho controller
router.get("/list", function(req, res){
// B2: Controller yeu cau repository tra ve tat ca lop hoc
let lophoc_data = lophoc_repo.findAll();
// B3: Repository yeu cau model tra ve tat ca lop hoc
// B4: Model tra ve 1 promise chua tat ca lop hoc cho repository
// B5: Repository tra promise do ve controller
lophoc_data.then(function(lophoc){
    
    if (lophoc){
        for (let j =0; j< lophoc.length; j++){
            lophoc[j]= lophoc[j].toObject();
            for (let i=0; i<lophoc[j].user_id.length; i++ ){
                delete lophoc[j].user_id[i].password;
            }
        }
        
    }
    res.status(200).json({
        message: "success",
        lophoc:lophoc
    });
}).catch(function(error){
    console.log(error);
    res.status(500).json({
        message: "loi roi",

    });
});
// B6: Controller tra ve client
});

// Add new lophoc
// B1: Client truyen cho controller 1 method post va 1 body
//B2: Controller hung va truyen toi repository va yeu cau insert lop hoc
// B3: repository yeu cau model insert vao DB lop hoc voi thong tin body do
// B4: Model tra ve reposiroty trang thai insert thanh cong, 

router.post("/create", function(req, res){
    //B2:
    var params = req.body;
    console.log(params);
    let lophoc_data = lophoc_repo.insertNew(params);

    lophoc_data.then(function(lophoc){
        if (lophoc){
            res.status(200).json({
                message: "success",
                lophoc: lophoc
            });
        }
    }).catch(function(error){
        res.status(500).json({
            message: "loi roi"
        });
    });
});

// Add new sinh vien vao lop hoc
   // B1: Client truyen cho controller body va method post
   // B2: Controller hung body va yeu cau repository insert vao model 1 sinh vien voi body
   // B3: Repository lay thong tin lop hoc ra va update insert sinh vien vao model
   // B4: Models tra ve repo ket qua 
   // B5: Repo tra ve controller ket qua
   // B6: Controller tra ve client ket qua

router.post("/add_sinhvien", function(req, res){
    // B2:
    var params = req.body;
    let id = params.id;
    let lophoc_data = lophoc_repo.findById(id);

    lophoc_data.then(function(lophoc){
        console.log(lophoc);
        if (lophoc){
            // console.log(lophoc.user_id);
            // console.log(params.sinhvien);
            lophoc.user_id.push(params.sinhvien[0]);
            // console.log(lophoc.user_id);
            // console.log(lophoc);
            lophoc.save();
            // console.log(lophoc);
            lophoc = lophoc.toObject();
            for (let i=0; i< lophoc.user_id.length; i++){
                delete lophoc.user_id[i].password;
            }
        }
        res.status(200).json({
            message: "success",
            lophoc: lophoc
        });
    }).catch(function(error){
        console.log(error);
        res.status(500).json({
            message: "loi roi"
        });
    });
});


module.exports = router;

