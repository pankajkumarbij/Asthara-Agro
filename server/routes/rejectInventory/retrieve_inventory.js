const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const RejectInventory=require('../../models/rejectInventory/reject_inventory');

//Define ROute to  retrive all orders 
router.get('/retrive_reject_inventory',(req, res)=>{
    RejectInventory.find(function(err, fi){
        if(err){
            console.log(err);
        }
        else {
            res.json(fi);
        }
    });
});

router.get('/retrive_reject_inventory_by_id/:id',(req, res)=>{
    RejectInventory.find({'_id':req.params.id}, function(err, fi){
       if(err){
           console.log(err);
       }
       else {
           res.json(fi);
       }
   });
});


module.exports = router;