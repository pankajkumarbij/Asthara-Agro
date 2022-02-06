const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Delivery_assignment = require('../../models/delivery_assignment/delivery_assignment');
//DEfine ROute to save delivery assignment
router.post('/delivery_assignment', (req, res)=>{
    var newDelivery = new Delivery_assignment({
        
        order_id: req.body.order_id,
        user_id:req.body.user_id,
        vendor_id:req.body.vendor_id,
        invoice_id: req.body.invoice_id,
        items:req.body.items,
        address_id: req.body.address_id,
        address_location:req.body.address_location,
        status: req.body.status,

    })
    newDelivery.save()
    .then(delivery_assignment => {
        res.json(delivery_assignment);
    })
    .catch(err => res.json(err));
});

module.exports = router;