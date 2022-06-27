const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Recieved_from_vendor = require('../../../models/report/received_from_vendor/received_from_vendor');

//Define ROute to  retrive all orders 
router.get('/retrive_rfv',(req, res)=>{
    Recieved_from_vendor.find(function(err, orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});

router.get('/retrive_rfv_by_id/:id',(req, res)=>{
    Recieved_from_vendor.find({'_id':req.params.id}, function(err, order){
       if(err){
           console.log(err);
       }
       else {
           res.json(order);
       }
   });
});


module.exports = router;