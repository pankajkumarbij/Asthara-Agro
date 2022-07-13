const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const MandiInventory=require('../../models/mandiInventory/mandi_inventory');

//Define ROute to  retrive all orders 
router.get('/retrive_mandi_inventory',(req, res)=>{
    MandiInventory.find(function(err, fi){
        if(err){
            console.log(err);
        }
        else {
            res.json(fi);
        }
    });
});

router.get('/retrive_mandi_inventory_by_id/:id',(req, res)=>{
    MandiInventory.find({'_id':req.params.id}, function(err, fi){
       if(err){
           console.log(err);
       }
       else {
           res.json(fi);
       }
   });
});

module.exports = router;