const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Order = require('../../models/order/order');
const OrderSummary = require('../../models/order/order_item_summary');
//Define ROute to  retrive all orders 
router.get('/retrive_all_order',(req, res)=>{
    Order.find(function(err, orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});

router.get('/retrive_order/:id',(req, res)=>{
    Order.find({'_id':req.params.id}, function(err, order){
       if(err){
           console.log(err);
       }
       else {
           res.json(order);
       }
   });
});

router.get('/retrive_orders_by_status/:status',(req, res)=>{
    Order.find({status:req.params.status}, function(err, orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});
router.get('/retrive_all_completed_order',(req, res)=>{
    Order.find({status:"completed"}, function(err, orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});

//Define ROute to  retrive order item Summary 
router.get('/retrive_all_order_item_summary',(req, res)=>{
    OrderSummary.find({}, function(err, orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});

router.get('/retrive_all_order_item_summary_by_id/:id',(req, res)=>{
    OrderSummary.find({_id:req.params.id}, function(err, orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});

router.get('/retrive_order_item_summary_quantity/:id',(req, res)=>{
    OrderSummary.find({'_id':req.params.id}, function(err, order){
       if(err){
           console.log(err);
       }
       else {
           res.json({quantity: order[0].item.quantity,vendor_rejected:order[0].vendor_rejected});
       }
   });
});

module.exports = router;