const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Delivery= require('../../models/delivery/delivery');
//Define Route to create order 
router.put('/update_delivery/:id', (req, res)=>{
    var delivery_update = {
        buyerId: req.body.buyerId,
        vehicle_number: req.body.vehicle_number,
        driver_name: req.body.driver_name,
        labour_name: req.body.labour_name,
        driver_mobile_no: req.body.driver_mobile_no,
        labour_mobile_no:req.body.labour_mobile_no,
        orders_items: req.body.orders_items,
    }
    Delivery.findOneAndUpdate({'_id':req.params.id}, delivery_update)
    .then((delivery) => {
        if(delivery){
            var message = { message: "delivery details sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "delivery details  not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

router.put('/update_delivery_unloading_img/:id', (req, res)=>{
    var delivery_update = {
        img7: req.body.img7,
        img8: req.body.img8,
        img9: req.body.img9,
        img10: req.body.img10,
        img11: req.body.img11,
        img12: req.body.img12,
    }
    Delivery.findOneAndUpdate({'_id':req.params.id}, delivery_update)
    .then((delivery) => {
        if(delivery){
            res.json({data:delivery, msg: "successfully saved"});
        }else{
            res.json({msg: "not found"});
        }
    }).catch(err => {
        console.log(err);
        res.json({ msg:"Something wrong!", err: err });
    })
});

module.exports = router;