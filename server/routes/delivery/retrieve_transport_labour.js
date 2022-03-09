const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Delivery= require('../../models/delivery/delivery');
//Define ROute to  retrive all orders 
router.get('/retrieve_delivery',(req, res)=>{
    Delivery.find(function(err, delivery){
        if(err){
            console.log(err);
        }
        else {
            res.json(delivery);
        }
    });
});

router.get('/retrieve_delivery_by_Id/:id',(req, res)=>{
    Delivery.find({'_id':req.params.id}, function(err, delivery){
       if(err){
           console.log(err);
       }
       else {
           res.json(delivery);
       }
   });
});


module.exports = router;