const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Delivered = require('../../../models/report/delivered/delivered');

//Define ROute to  retrive all orders 
router.get('/retrive_delivered_orders',(req, res)=>{
    Delivered.find(function(err, orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});

router.get('/retrive_delivered_order/:id',(req, res)=>{
    Delivered.find({'_id':req.params.id}, function(err, order){
       if(err){
           console.log(err);
       }
       else {
           res.json(order);
       }
   });
});


module.exports = router;