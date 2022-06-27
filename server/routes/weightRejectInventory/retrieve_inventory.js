const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const WeightRejectInventory=require('../../models/weightRejectInventory/weight_reject_inventory');

//Define ROute to  retrive all orders 
router.get('/retrive_weight_reject_inventory',(req, res)=>{
    WeightRejectInventory.find(function(err, fi){
        if(err){
            console.log(err);
        }
        else {
            res.json(fi);
        }
    });
});

router.get('/retrive_weight_reject_inventory_by_id/:id',(req, res)=>{
    WeightRejectInventory.find({'_id':req.params.id}, function(err, fi){
       if(err){
           console.log(err);
       }
       else {
           res.json(fi);
       }
   });
});


module.exports = router;