const express = require('express');
const router = express.Router();
const Fdc = require('../../models/farmer_data_collection/farmer_data_collection');

router.get('/retrieve_fdc',(req, res)=>{
    Fdc.find({}, function(err, data){
        if(err){
            console.log(err);
        }
        else {
            res.json(data);
        }
    });
});

router.get('/retrieve_fdc_by_id/:id',(req, res)=>{
    Fdc.find({_id:req.params.id}, function(err, crawler){
        if(err){
            console.log(err);
        }
        else {
            res.json(crawler);
        }
    });
});

module.exports = router;