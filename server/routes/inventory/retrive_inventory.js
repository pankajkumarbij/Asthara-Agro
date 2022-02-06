const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Inventory = require('../../models/inventory/inventory');
//DEfine Route to retrive the inventory details
router.get('/retrive_inventory',(req, res)=>{
    Inventory.find({}, function(err, inventory){
        if(err){
            console.log(err);
        }
        else {
            res.json(inventory);
        }
    });
});
router.get('/retrive_inventory_items',(req, res)=>{
    Inventory.find({}, function(err, inventory){
        if(err){
            console.log(err);
        }
        else {
            res.json(inventory);
        }
    });
});
module.exports = router;