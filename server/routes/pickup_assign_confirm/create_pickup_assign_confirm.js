const express = require('express');
const router = express.Router();
const PickupAssignConfirm = require('../../models/pickup_assign_confirm/pickup_assign_confirm');

router.post('/create_pickup_assign_confirm', (req, res)=>{
    var newPickupAssignConfirm = new PickupAssignConfirm({
        orderId:req.body.orderId,
        custom_orderId:req.body.custom_orderId,
        custom_vendorId:req.body.custom_vendorId,
        order_id:req.body.order_id,
        items:req.body.items,
        user_id:req.body.user_id,
        sales_id: req.body.sales_id,
        vendor_id:req.body.vendor_id,
        buyer_id:req.body.buyer_id,
        pickupAssignId:req.body.pickupAssignId,
        pickup_assign_confirm_date:req.body.pickup_assign_confirm_date,
        pickup_assign_confirm_time:req.body.pickup_assign_confirm_time,
        customerPoolId: req.body.customerPoolId,
        vendorPoolId: req.body.vendorPoolId,
        managerPoolId: req.body.managerPoolId,
    })
    newPickupAssignConfirm.save()
    .then(post => {
        var message={message:"successfully Create Pickup Assign Confirm"};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;