const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const ItemUnit = require('../../models/itemUnit/item_unit');
//Define route to retrive all item units
router.get('/retrive_all_item_unit',(req, res)=>{
    ItemUnit.find({status:"enabled"}, function(err, units){
        if(err){
            console.log(err);
        }
        else {
            res.json(units);
        }
    });
});

router.get('/retrive_item_unit/:id',(req, res)=>{
    ItemUnit.find({'_id':req.params.id}, function(err, units){
        if(err){
            console.log(err);
        }
        else {
            res.json(units);
        }
    });
});
router.get('/retrive_all_disabled_item_unit',(req, res)=>{
    ItemUnit.find({status:"disabled"}, function(err, units){
        if(err){
            console.log(err);
        }
        else {
            res.json(units);
        }
    });
});
module.exports = router;