const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const RetriveInventory = require('../../models/inventory/inventory');
//DEfine Route to retrive the inventory details
router.get('/retrive_inventory',(req, res)=>{
    RetriveInventory.find({}, function(err, retrive_inventory){
        if(err){
            console.log(err);
        }
        else {
            res.json(retrive_inventory);
        }
    });
});

module.exports = router;