const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const RejectedItems = require('../../models/rejectedItems/rejectedItems');

//Define ROute to  retrive all items 
router.get('/retrive_rejected_items',(req, res)=>{
    RejectedItems.find(function(err, items){
        if(err){
            console.log(err);
        }
        else {
            res.json(items);
        }
    });
});

router.get('/retrive_rejected_item/:id',(req, res)=>{
    RejectedItems.find({'_id':req.params.id}, function(err, item){
       if(err){
           console.log(err);
       }
       else {
           res.json(item);
       }
   });
});


module.exports = router;