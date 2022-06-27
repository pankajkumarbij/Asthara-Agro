const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const FreshInventory=require('../../models/freshInventory/fresh_inventory');

//Define ROute to  retrive all orders 
router.get('/retrive_fresh_inventory',(req, res)=>{
    FreshInventory.find(function(err, fi){
        if(err){
            console.log(err);
        }
        else {
            res.json(fi);
        }
    });
});

router.get('/retrive_fresh_inventory_by_id/:id',(req, res)=>{
    FreshInventory.find({'_id':req.params.id}, function(err, fi){
       if(err){
           console.log(err);
       }
       else {
           res.json(fi);
       }
   });
});


module.exports = router;