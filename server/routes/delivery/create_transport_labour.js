const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Delivery= require('../../models/delivery/delivery');

//Define Route to create order 
router.post('/create_delivery', (req, res)=>{
    var newDelivery = new Delivery({
        salesId: req.body.salesId,
        vehicle_type: req.body.vehicle_type,
        vehicle_number: req.body.vehicle_number,
        driver_name: req.body.driver_name,
        labour_name: req.body.labour_name,
        driver_mobile_no: req.body.driver_mobile_no,
        labour_mobile_no:req.body.labour_mobile_no,
        charge:req.body.charge,
        orders_items: req.body.orders_items,
        img: req.body.img,
        img2: req.body.img2,
        img3: req.body.img3,
        img4: req.body.img4,
        img5: req.body.img5,
    })
    newDelivery.save()
    .then(delivery=> {
        var message={message:"delivery details has been Successfully submitted!",delivery:delivery};
        res.json(message);
    })
    .catch(err => {
        var message={message:"Something went wrong!",error:err};
        res.json(message);
    })
});

module.exports = router;