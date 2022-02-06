const express = require('express');
const router = express.Router();
const UpdateDelivery = require('../../models/update_delivery/update_delivery');

router.post('/create_update_delivery', (req, res)=>{
    var newUpdateDelivery = new UpdateDelivery({
        
        requestedBy:req.body.userId,
        orderId:req.body.orderId,
        items:req.body.items,
        userId:req.body.userId,
        vendor_id:req.body.vendor_id,
        sales_id:req.body.sales_id,
        order_id:req.body.order_id,
        indent_id:req.body.indent_id,
        name:req.body.name,
        email:req.body.email,
        mobile_no:req.body.mobile_no,
        address:req.body.address,
        landmark:req.body.landmark,
        district:req.body.district,
        state:req.body.state,
        country:req.body.country,
        postal_code:req.body.postal_code,
        delivery_date:req.body.delivery_date,
        delivery_time:req.body.delivery_time,

    })
    newUpdateDelivery.save()
    .then(post => {
        var message={message:"successfully Update Delivery"};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;