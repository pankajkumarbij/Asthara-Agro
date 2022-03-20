const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Excess_inventory = require('../../models/excess_inventory_management/excess_inventory_management');
//Define ROute to  retrive all orders 
router.get('/retrieve_excess_inventory_details',(req, res)=>{
    Excess_inventory.find(function(err, data){
        if(err){
            console.log(err);
        }
        else {
            res.json(data);
        }
    });
});
//Define ROute to  retrive an Excess inventory Item
router.get('/retrieve_excess_inventory_detail/:id',(req, res)=>{
    Excess_inventory.find({'_id':req.params.id}, function(err, data){
        if(err){
            console.log(err);
        }
        else {
            res.json(data);
        }
    });
});
module.exports = router;