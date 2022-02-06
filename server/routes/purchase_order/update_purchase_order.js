const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../../models/purchase_order/purchase_order');

router.put('/update_purchase_order/:id',(req, res) =>{
    var purchase_order_update = {
        

        items:req.body.items,
    }
    PurchaseOrder.findOneAndUpdate({'_id':req.params.id}, purchase_order_update)
    .then((purchase_order) => {
        if(purchase_order){
            var message = {message: "Purchase Order sucessfully updated" };
            res.json(message);
        }else{
            var message = { messageerror: "Record not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

router.put('/update_purchase_status/:id',(req, res) =>{
    var purchase_update = {
        status: req.body.status,
    }
    PurchaseOrder.findOneAndUpdate({'_id':req.params.id}, purchase_update)
    .then((purchase) => {
        if(purchase){
            var message = { message: "Status sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "Purchase Order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"something went wrong!",success: false, err: err };
        res.json(message);
    })
});


router.put('/update_vendor_purchase_order/:id',(req, res) =>{
    var purchase_update = {
        vendor_id: req.body.vendor_id,
    }
    PurchaseOrder.findOneAndUpdate({'_id':req.params.id}, purchase_update)
    .then((purchase) => {
        if(purchase){
            var message = { message: "Vendor sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "Purchase Order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"something went wrong!",success: false, err: err };
        res.json(message);
    })
});


router.put('/update_purchase_order_status/:id',(req, res) =>{
    var purchase_update = {
        status: req.body.status,
    }
    PurchaseOrder.findOneAndUpdate({'_id':req.params.id}, purchase_update)
    .then((purchase) => {
        if(purchase){
            var message = { message: "Status sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "Purchase Order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"something went wrong!",success: false, err: err };
        res.json(message);
    })
});
module.exports = router;