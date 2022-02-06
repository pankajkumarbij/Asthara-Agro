const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../../models/purchase_order/purchase_order');

router.get('/retrive_all_purchase_order',(req, res)=>{
    PurchaseOrder.find({}, function(err, purchase_orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(purchase_orders);
        }
    });
});

router.get('/retrive_purchase_order/:id',(req, res)=>{
    PurchaseOrder.find({'_id':req.params.id}, function(err, purchase_order){
        if(err){
            console.log(err);
        }
        else {
            res.json(purchase_order);
        }
    });
});

router.get('/retrive_all_pending_purchase_order',(req, res)=>{
    PurchaseOrder.find({status:"pending for vendor acceptance"}, function(err, purchase_orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(purchase_orders);
        }
    });
});
router.get('/retrive_all_accepted_purchase_order',(req, res)=>{
    PurchaseOrder.find({status:"Vendor Accepted"}, function(err, purchase_orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(purchase_orders);
        }
    });
});
router.get('/retrive_all_approved_purchase_order',(req, res)=>{
    PurchaseOrder.find({status:"approved"}, function(err, purchase_orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(purchase_orders);
        }
    });
});
router.get('/retrive_all_declined_purchase_order',(req, res)=>{
    PurchaseOrder.find({status:"decline"}, function(err, purchase_orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(purchase_orders);
        }
    });
});

module.exports = router;