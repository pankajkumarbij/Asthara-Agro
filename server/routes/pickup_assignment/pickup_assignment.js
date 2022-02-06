const express = require('express');
const router = express.Router();
const Pickup_assignment = require('../../models/pickup_assignment/pickup_assignment');

router.post('/pickup_assignment', (req, res)=>{
    var newPickup = new Pickup_assignment({
        
        purchase_order_id: req.body.purchase_order_id,
        user_id:req.body.user_id,
        vendor_id: req.body.vendor_id,
        item_description:req.body.item_description,
        address_id: req.body.address_id,
        address_location:req.body.address_location,
        status: req.body.status,
        customerPoolId: req.body.customerPoolId,
        vendorPoolId: req.body.vendorPoolId,
        managerPoolId: req.body.managerPoolId,
    })
    newPickup.save()
    .then(pickup_assignment => {
        res.json(pickup_assignment);
    })
    .catch(err => res.json(err));
});

module.exports = router;