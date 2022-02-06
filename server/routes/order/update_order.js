const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Order = require('../../models/order/order');
const OrderSummary = require('../../models/order/order_item_summary');
//Define Route update order by id
router.put('/update_order/:id',(req, res) =>{
    var order_update = {
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
    }
    Order.findOneAndUpdate({'_id':req.params.id}, order_update)
    .then((order) => {
        if(order){
            var message = { message: "order sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});
//define route update to status by id
router.put('/update_status/:id',(req, res) =>{
    var order_update = {
        status: req.body.status,
    }
    Order.findOneAndUpdate({'_id':req.params.id}, order_update)
    .then((order) => {
        if(order){
            var message = { message: "Status sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"something went wrong!",success: false, err: err };
        res.json(message);
    })
});

//define route update to status by id
router.put('/update_completion_status/:id',(req, res) =>{
    var order_update = {
        completion_status: req.body.completion_status,
    }
    Order.findOneAndUpdate({'_id':req.params.id}, order_update)
    .then((order) => {
        if(order){
            var message = { message: "Status sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"something went wrong!",success: false, err: err };
        res.json(message);
    })
});

// update order item summary
router.put('/update_order_item_summary/:id',(req, res) =>{
    var order_update = {
        items: req.body.item,
    }
    OrderSummary.findOneAndUpdate({'_id':req.params.id}, order_update)
    .then((order) => {
        if(order){
            var message = { message: "order item summary sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

//define route update to status by id for order_item summary
router.put('/update_status_order_item_summary/:id',(req, res) =>{
    var order_update = {
        status: req.body.status,
    }
    OrderSummary.findOneAndUpdate({'_id':req.params.id}, order_update)
    .then((order) => {
        if(order){
            var message = { message: "Status sucessfully updated for Order Item Summary" };
            res.json(message);
        }else{
            var message = { message: "order item summary not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"something went wrong!",success: false, err: err };
        res.json(message);
    })
});

router.put('/update_quantity_order_item_summary/:id',(req, res) =>{
    var order_update = {
        item: req.body.item,
        status: req.body.status,
        vendor_rejected:req.body.vendor_rejected,
    }
    OrderSummary.findOneAndUpdate({'_id':req.params.id}, order_update)
    .then((order) => {
        if(order){
            var message = { message: "Quantity sucessfully updated for Order Item Summary" };
            res.json(message);
        }else{
            var message = { message: "order item summary not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"something went wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;