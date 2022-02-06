const express = require('express');
const router = express.Router();
const DeliveryAssign = require('../../models/delivery_assign/delivery_assign');

router.put('/update_delivery_assign/:id',(req, res) =>{
    var delivery_assign_update = {
        

        items:req.body.items,
    }
    DeliveryAssign.findOneAndUpdate({'_id':req.params.id}, delivery_assign_update)
    .then((delivery_assign) => {
        if(delivery_assign){
            var message = {message: "Delivery Assign sucessfully updated" };
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

router.put('/update_delivery_assign_status/:id',(req, res) =>{
    var delivery_assign = {
        status: req.body.status,
    }
    DeliveryAssign.findOneAndUpdate({'_id':req.params.id}, delivery_assign)
    .then((delivery_assign) => {
        if(delivery_assign){
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


router.put('/update_sales_delivery_assign/:id',(req, res) =>{
    var delivery_assign = {
        vendor_id: req.body.vendor_id,
    }
    DeliveryAssign.findOneAndUpdate({'_id':req.params.id}, delivery_assign)
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