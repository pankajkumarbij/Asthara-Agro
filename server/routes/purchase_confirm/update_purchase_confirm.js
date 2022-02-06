const express = require('express');
const router = express.Router();
const PurchaseOrderConfirm = require('../../models/purchase_confirm/purchase_confirm');

router.put('/update_purchase_order_confirm/:id',(req, res) =>{
    var purchase_order_confirm_update = {
        

        items:req.body.items,
    }
    PurchaseOrderConfirm.findOneAndUpdate({'_id':req.params.id}, purchase_order_confirm_update)
    .then((purchase_order_confirm) => {
        if(purchase_order_confirm){
            var message = {message: "Purchase Order Confirm sucessfully updated" };
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

router.put('/update_purchase_confirm_status/:id',(req, res) =>{
    var purchase_confirm_update = {
        status: req.body.status,
    }
    PurchaseOrderConfirm.findOneAndUpdate({'_id':req.params.id}, purchase_confirm_update)
    .then((purchaseConfirm) => {
        if(purchaseConfirm){
            var message = { message: "Status sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "Purchase Order Confirm not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"something went wrong!",success: false, err: err };
        res.json(message);
    })
});


module.exports = router;