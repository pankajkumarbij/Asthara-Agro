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

module.exports = router;