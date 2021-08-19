const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../../models/purchase_order/purchase_order');

router.post('/create_purchase_order', (req, res)=>{
    var newPurchaseOrder = new PurchaseOrder({
        
        requestedBy:req.body.userId,
        orderId:req.body.orderId,
        items:req.body.items,
        user_id:req.body.user_id,
        vendor_id:req.body.vendor_id,
        indent_id:req.body.indent_id,
        
        purchase_order_date:req.body.purchase_order_date,
        purchase_order_time:req.body.purchase_order_tiem,

    })
    newPurchaseOrder.save()
    .then(post => {
        var message={message:"successfully Purchase Order Created"};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;