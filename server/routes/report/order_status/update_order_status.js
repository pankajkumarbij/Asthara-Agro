const express = require('express');
const router = express.Router();
const order_status= require('../../../models/report/order_status/order_status');

router.put('/update_order_status/:id',(req, res) =>{
    var update = {
        status: req.body.status,
    }
    order_status.findOneAndUpdate({'_id':req.params.id},update)
    .then((order) => {
        if(order){
            var message = { message: "order status updated sucessfully" };
            res.json(message);
        }else{
            var message = { message: "order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});

router.put('/update_order_spit_status/:id',(req, res) =>{
    var update = {
        split_status: req.body.split_status,
    }
    order_status.findOneAndUpdate({'_id':req.params.id},update)
    .then((order) => {
        if(order){
            var message = { message: "order split status updated sucessfully" };
            res.json(message);
        }else{
            var message = { message: "order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});

router.put('/update_order_item_quantity/:id',(req, res) =>{
    var update = {
        quantity: req.body.quantity,
    }
    order_status.findOneAndUpdate({'_id':req.params.id},update)
    .then((order) => {
        if(order){
            var message = { message: "order status quantity updated sucessfully" };
            res.json(message);
        }else{
            var message = { message: "order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});

router.put('/update_order_quantity/:orderid/:item_name/:item_grade/:quantity',(req, res) =>{
    var update = {
        quantity: req.body.quantity,
        split_status: req.body.split_status,
    }
    order_status.findOneAndUpdate({'orderId':req.params.orderid,'item_name':req.params.item_name,'item_grade':req.params.item_grade,'quantity':req.params.quantity},update)
    .then((order) => {
        if(order){
            var message = { message: "order status quantity updated sucessfully" };
            res.json(message);
        }else{
            var message = { message: "order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});

router.put('/update_order_item_status/:orderid/:item_name/:item_grade/:quantity',(req, res) =>{
    var update = {
        status: req.body.status,
    }
    order_status.findOneAndUpdate({'orderId':req.params.orderid,'item_name':req.params.item_name,'item_grade':req.params.item_grade,'quantity':req.params.quantity},update)
    .then((order) => {
        if(order){
            var message = { message: "order status updated sucessfully" };
            res.json(message);
        }else{
            var message = { message: "order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});

router.put('/update_order_item_split_status/:orderid/:item_name/:item_grade/:quantity',(req, res) =>{
    var update = {
        split_status: req.body.split_status,
    }
    order_status.findOneAndUpdate({'orderId':req.params.orderid,'item_name':req.params.item_name,'item_grade':req.params.item_grade,'quantity':req.params.quantity},update)
    .then((order) => {
        if(order){
            var message = { message: "order split status updated sucessfully" };
            res.json(message);
        }else{
            var message = { message: "order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});

module.exports = router;
