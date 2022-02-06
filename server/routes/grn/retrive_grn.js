const express = require("express");
const router = express.Router();
/* Required Model for store in database*/
const Grn=require('../../models/grn/grn')
//Define Route to display the GRN
router.get('/displaygrn',(req, res)=>{
        Grn.find({}, function(err, Grns){
        if(err){
            console.log(err);
        }
        else {
            res.json(Grns);
        }
    });
});
//DEfien Route to display GRN by id
router.get('/displaygrn/:id',(req, res)=>{
        Grn.find({'_id':req.params.id}, function(err, Grns){
        if(err){
            console.log(err);
        }
        else {
            res.json(Grns);
        }
    });
});
router.get('/retrive_all_grn',(req, res)=>{
        Grn.find({}, function(err, Grns){
        if(err){
            console.log(err);
        }
        else {
            res.json(Grns);
        }
    });
});
//DEfien Route to display GRN by id
router.get('/retrive_grn/:id',(req, res)=>{
        Grn.find({'_id':req.params.id}, function(err, Grns){
        if(err){
            console.log(err);
        }
        else {
            res.json(Grns);
        }
    });
});
module.exports = router;
