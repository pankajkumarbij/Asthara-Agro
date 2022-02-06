const express = require('express');
const router = express.Router();
const PurchaseOrderConfirm = require('../../models/purchase_confirm/purchase_confirm');

router.post('/create_purchase_confirm', (req, res)=>{
    var newPurchaseOrderConfirm = new PurchaseOrderConfirm({
        orderId:req.body.orderId,
        custom_orderId:req.body.custom_orderId,
        custom_vendorId:req.body.custom_vendorId,
        order_id:req.body.order_id,
        items:req.body.items,
        user_id:req.body.user_id,
        vendor_id:req.body.vendor_id,
        purchaseId:req.body.purchaseId,
        customerPoolId: req.body.customerPoolId,
        vendorPoolId: req.body.vendorPoolId,
        managerPoolId: req.body.managerPoolId,
        purchase_order_date:req.body.purchase_order_date,
        purchase_order_time:req.body.purchase_order_tiem,
    })
    newPurchaseOrderConfirm.save()
    .then(post => {
        var message={message:"Purchase Confirm Created"};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;