const express = require('express');
const router = express.Router();
const order_status= require('../../../models/report/order_status/order_status');

router.get('/retrive_order_status',(req, res)=>{
   order_status.find(function(err, orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});

router.get('/retrive_order_status_by_id/:id',(req, res)=>{
   order_status.find({'_id':req.params.id}, function(err, order){
       if(err){
           console.log(err);
       }
       else {
           res.json(order);
       }
   });
});

router.get('/retrive_order_status_by_orderId/:id',(req, res)=>{
    order_status.find({'orderId':req.params.id}, function(err, order){
        if(err){
            console.log(err);
        }
        else {
            res.json(order);
        }
    });
 });


module.exports = router;