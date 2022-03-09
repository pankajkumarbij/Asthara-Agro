const express = require('express');
const router = express.Router();
const order_status= require('../../../models/report/order_status/order_status');

router.post('/create_order_status', (req, res)=>{
    var newStatus = new order_status({
        orderId:req.body.orderId,
        item_name:req.body.item_name,
        item_grade:req.body.item_grade,
        quantity: req.body.quantity,
        status:req.body.status,
        split_status:req.body.split_status,
    })
    newStatus.save()
    .then(post => {
        var message={message:"successfully added the status ",status_details:post};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;