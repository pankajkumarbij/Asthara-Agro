const express = require('express');
const router = express.Router();
const PurchaseOrderConfirm = require('../../models/purchase_confirm/purchase_confirm');

router.get('/retrive_all_purchase_order_confirm',(req, res)=>{
    PurchaseOrderConfirm.find({}, function(err, purchase_order_confirm){
        if(err){
            console.log(err);
        }
        else {
            res.json(purchase_order_confirm);
        }
    });
});

router.get('/retrive_purchase_order_confirm/:id',(req, res)=>{
    PurchaseOrderConfirm.find({'_id':req.params.id}, function(err, purchase_order_confirm){
        if(err){
            console.log(err);
        }
        else {
            res.json(purchase_order_confirm);
        }
    });
});

router.get('/retrive_all_pending_purchase_order_confirm',(req, res)=>{
    PurchaseOrderConfirm.find({"status":"pending for manager acceptance"}, function(err, purchase_order_confirm){
        if(err){
            console.log(err);
        }
        else {
            res.json(purchase_order_confirm);
        }
    });
});

router.get('/retrive_all_accepted_purchase_order_confirm',(req, res)=>{
    PurchaseOrderConfirm.find({"status":"Buyer Assigned"}, function(err, purchase_order_confirm){
        if(err){
            console.log(err);
        }
        else {
            res.json(purchase_order_confirm);
        }
    });
});

module.exports = router;