const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Purchase_order = require('../../../models/report/completed_purchase_order/completed_purchase_order');

//Define ROute to  retrive all orders 
router.get('/retrive_completed_purchase_orders',(req, res)=>{
    Purchase_order.find(function(err, orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});

router.get('/retrive_completed_purchase_order/:id',(req, res)=>{
    Purchase_order.find({'_id':req.params.id}, function(err, order){
       if(err){
           console.log(err);
       }
       else {
           res.json(order);
       }
   });
});


module.exports = router;