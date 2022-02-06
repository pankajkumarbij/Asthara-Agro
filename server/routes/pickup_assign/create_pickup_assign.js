const express = require('express');
const router = express.Router();
const PickupAssign = require('../../models/pickup_assign/pickup_assign');

router.post('/create_pickup_assign', (req, res)=>{
    var newPickupAssign = new PickupAssign({
        orderId:req.body.orderId,
        custom_orderId:req.body.custom_orderId,
        custom_vendorId:req.body.custom_vendorId,
        order_id:req.body.order_id,
        items:req.body.items,
        user_id:req.body.user_id,
        vendor_id:req.body.vendor_id,
        buyer_id:req.body.buyer_id,
        pickup_assign_date:req.body.pickup_assign_date,
        pickup_assign_time:req.body.pickup_assign_time,
        customerPoolId: req.body.customerPoolId,
        vendorPoolId: req.body.vendorPoolId,
        managerPoolId: req.body.managerPoolId,
    })
    newPickupAssign.save()
    .then(post => {
        var message={message:"successfully Pickup Assigned"};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;