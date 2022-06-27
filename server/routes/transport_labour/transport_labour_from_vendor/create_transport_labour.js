const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Transport= require('../../../models/transport_labour/transport_labour_from_vendor/transport_labour_from_vendor');

//Define Route to create order 
router.post('/create_transport_labour_from_vendor', (req, res)=>{
    console.log(req.body);
    var newTransport = new Transport({
        buyerId: req.body.buyerId,
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
        img6: req.body.img6,
    })
    newTransport.save()
    .then(transport=> {
        var message={message:"transport details has been Successfully submitted!",transport:transport};
        res.json(message);
    })
    .catch(err => {
        var message={message:"Something went wrong!",error:err};
        res.json(message);
    })
});

module.exports = router;