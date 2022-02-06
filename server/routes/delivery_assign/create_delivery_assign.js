const express = require('express');
const router = express.Router();
const DeliveryAssign = require('../../models/delivery_assign/delivery_assign');

router.post('/create_delivery_assign', (req, res)=>{
    var newDeliveryAssign = new DeliveryAssign({
        
        requestedBy:req.body.userId,
        name:req.body.name,
        email:req.body.email,
        mobile_no:req.body.mobile_no,
        address:req.body.address,
        landmark:req.body.landmark,
        district:req.body.district,
        state:req.body.state,
        country:req.body.country,
        postal_code:req.body.postal_code,
        orderId:req.body.orderId,
        items:req.body.items,
        userId:req.body.userId,
        sales_id:req.body.sales_id,

        vendor_id:req.body.vendor_id,
        indent_id:req.body.indent_id,
        
        
        delivery_assign_date:req.body.delivery_assign_date,
        delivery_assign_time:req.body.delivery_assign_time,

    })
    newDeliveryAssign.save()
    .then(post => {
        var message={message:"successfully Delivery Assigned"};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;