const express = require('express');
const router = express.Router();
const PickupAssign = require('../../models/pickup_assign/pickup_assign');

router.put('/update_pickup_assign/:id',(req, res) =>{
    var pickup_assign_update = {
        

        items:req.body.items,
    }
    PickupAssign.findOneAndUpdate({'_id':req.params.id}, pickup_assign_update)
    .then((pickup_assign) => {
        if(pickup_assign){
            var message = {message: "Pickup Assign sucessfully updated" };
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

router.put('/update_pickup_assign_status/:id',(req, res) =>{
    var pickup_assign = {
        status: req.body.status,
    }
    PickupAssign.findOneAndUpdate({'_id':req.params.id}, pickup_assign)
    .then((pickup_assign) => {
        if(pickup_assign){
            var message = { message: "Status sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "Pickup Assign not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"something went wrong!",success: false, err: err };
        res.json(message);
    })
});


router.put('/update_buyer_pickup_assign/:id',(req, res) =>{
    var pickup_assign = {
        vendor_id: req.body.vendor_id,
    }
    PickupAssign.findOneAndUpdate({'_id':req.params.id}, pickup_assign)
    .then((pickup_assign) => {
        if(pickup_assign){
            var message = { message: "Buyer sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "pickup_assign not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"something went wrong!",success: false, err: err };
        res.json(message);
    })
});



module.exports = router;