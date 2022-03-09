const express = require('express');
const router = express.Router();
const Purchase_order = require('../../../models/report/completed_purchase_order/completed_purchase_order');
router.put('/update_flag_completed_purchase_order/:id',(req, res) =>{
    var update = {
        flag:req.body.flag,
        driver_mobile_no: req.body.driver_mobile_no,
        driver_name: req.body.driver_name,
        vehicle_number: req.body.vehicle_number,
        labour_name: req.body.labour_name,
        labour_mobile_no: req.body.labour_mobile_no,
    }
    Purchase_order.findOneAndUpdate({'_id':req.params.id},update)
    .then((user) => {
        if(user){
            var message = { message: "order item added sucessfully" };
            res.json(message);
        }else{
            var message = { message: "order item  not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});

router.put('/update_barcode_completed_purchase_order/:id',(req, res) =>{
    var update = {
        barcode: req.body.barcode,
    }
    Purchase_order.findOneAndUpdate({'_id':req.params.id},update)
    .then((user) => {
        if(user){
            var message = { message: "barcode generated sucessfully" };
            res.json(message);
        }else{
            var message = { message: "order item  not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});

module.exports = router;
