const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Order = require('../../models/order/order');
const OrderSummary = require('../../models/order/order_item_summary');
//Define Route to create order 
router.post('/create_order', (req, res)=>{
    var newOrder = new Order({
        userId: req.body.userId,
        customerId: req.body.customerId,
        nick_name: req.body.nick_name,
        name: req.body.name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        address: req.body.address,
        landmark: req.body.landmark,
        district: req.body.district,
        state: req.body.state,
        country: req.body.country,
        postal_code: req.body.postal_code,
        items: req.body.items,
        customerPoolId: req.body.customerPoolId,
        vendorPoolId: req.body.vendorPoolId,
        order_date:req.body.order_date,
        order_time:req.body.order_time,
    })
    newOrder.save()
    .then(order => {
        var message={message:"your order has been Successfully submitted!",order:order};
        res.json(message);
    })
    .catch(err => {
        var message={message:"Something went wrong!",error:err};
        res.json(message);
    })
});

router.post('/create_order_item_summary', (req, res)=>{
    var newOrder = new OrderSummary({
        userId: req.body.userId,
        orderId: req.body.orderId,
        sales_id: req.body.sales_id,
        custom_orderId: req.body.custom_orderId,
        customerPoolId: req.body.customerPoolId,
        vendorPoolId: req.body.vendorPoolId,
        managerPoolId: req.body.managerPoolId,
        item: req.body.item,
    })
    newOrder.save()
    .then(order => {
        var message={message:"your order Item Summary has been Successfully created!",order:order};
        res.json(message);
    })
    .catch(err => {
        var message={message:"Something went wrong!",error:err};
        res.json(message);
    })
});

module.exports = router;