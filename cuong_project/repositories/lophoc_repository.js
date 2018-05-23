'use strict';

var models = require("../models")

var LophocRepository = {
    findAll : function (){
        return models.Lophoc.find().populate("user_id");
    },
    // findByEmail: function (email){
    //     return models.lophoc.findOne({email: email});
    // },
    findById: function (id){
        return models.Lophoc.findOne({_id: id}).populate("user_id");
    },
    insertNew: function(params){
        let new_lophoc = new models.Lophoc({
            malophoc: params.ma,
            tenlophoc: params.name
        });
        return new_lophoc.save();
    },
    create: function (lophoc){
        let new_lophoc = new models.Lophoc (lophoc);
        return new_lophoc.save();
    }
}

module.exports = LophocRepository;