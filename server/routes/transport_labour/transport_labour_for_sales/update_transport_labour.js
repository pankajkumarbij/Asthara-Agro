const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Transport= require('../../../models/transport_labour/transport_labour_for_sales/transport_labour_for_sales');

//Define Route to create order 
router.put('/update_transport_labour_for_sales/:id', (req, res)=>{
    var transport_update = {
        buyerId: req.body.buyerId,
        vehicle_number: req.body.vehicle_number,
        driver_name: req.body.driver_name,
        labour_name: req.body.labour_name,
        driver_mobile_no: req.body.driver_mobile_no,
        labour_mobile_no:req.body.labour_mobile_no,
        orders_items: req.body.orders_items,
    }
    Transport.findOneAndUpdate({'_id':req.params.id}, transport_update)
    .then((transport) => {
        if(transport){
            var message = { message: "transport details sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "transport details  not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;