const express = require('express');
const router = express.Router();
const UpdateDelivery = require('../../models/update_delivery/update_delivery');

router.put('/update_delivery_items/:id',(req, res) =>{
    var delivery_update = {
        items:req.body.items,
    }
    UpdateDelivery.findOneAndUpdate({'_id':req.params.id}, delivery_update)
    .then((delivery_assign) => {
        if(delivery_assign){
            var message = {message: "Delivery sucessfully updated" };
            res.json(message);
        }else{
            var message = { messageerror: "Record not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

router.put('/update_delivery_status/:id',(req, res) =>{
    var update_delivery = {
        status: req.body.status,
    }
    UpdateDelivery.findOneAndUpdate({'_id':req.params.id}, update_delivery)
    .then((update_delivery) => {
        if(update_delivery){
            var message = { message: "Status sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "Delivery Assign not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"something went wrong!",success: false, err: err };
        res.json(message);
    })
});
router.put('/update_delivery_status_complete_order/:id',(req, res) =>{
    var update_delivery = {
        status: req.body.status,
    }
    UpdateDelivery.findOneAndUpdate({'_id':req.params.id}, update_delivery)
    .then((update_delivery) => {
        if(update_delivery){
            var message = { message: "Order Sucessfully Delivered" };
            res.json(message);
        }else{
            var message = { message: "Delivery Assign not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"something went wrong!",success: false, err: err };
        res.json(message);
    })
});
router.put('/update_delivery_by_customer/:id',(req, res) =>{
    var delivery_update = {
        items:req.body.items,
    }
    UpdateDelivery.findOneAndUpdate({'_id':req.params.id}, delivery_update)
    .then((delivery_assign) => {
        if(delivery_assign){
            var message = {message: "Delivery Updated Sucessfully" };
            res.json(message);
        }else{
            var message = { messageerror: "Record not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

router.put('/update_sales_delivery_assign/:id',(req, res) =>{
    var delivery_assign = {
        vendor_id: req.body.vendor_id,
    }
    UpdateDelivery.findOneAndUpdate({'_id':req.params.id}, delivery_assign)
    .then((delivery_assign) => {
        if(delivery_assign){
            var message = { message: "Sales sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "delivery_assign not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"something went wrong!",success: false, err: err };
        res.json(message);
    })
});



module.exports = router;