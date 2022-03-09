const express = require('express');
const router = express.Router();
const Recieved_from_buyer = require('../../../models/report/recieved_from_buyer/received_from_buyer');

router.post('/create_rfb', (req, res)=>{
    var newRfb = new Recieved_from_buyer({
        vehicle_number: req.body.vehicle_number,
        driver_name: req.body.driver_name,
        labour_name: req.body.labour_name,
        driver_mobile_no: req.body.driver_mobile_no,
        labour_mobile_no: req.body.labour_mobile_no,
        purchase_order: req.body.purchase_order,
        barcode: req.body.barcode,
    })
    newRfb.save()
    .then(post => {
        var message={message:"successfully added",purchase_details:post};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;