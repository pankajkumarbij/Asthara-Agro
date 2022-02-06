const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Address = require('../../models/customer_address/customer_address');
//Define route for create address
router.post('/create_customer_address', (req, res)=>{
    var newAddress = new Address({
        customerId: req.body.customerId,
        customerEmail: req.body.customerEmail,
        address: req.body.address,
        landmark: req.body.landmark,
        district: req.body.district,
        state: req.body.state,
        country: req.body.country,
        postal_code: req.body.postal_code,
    })
    newAddress.save()
    .then(address => {
        var message={message:"customer address added succesfully!",address:address}
        res.json(message);
    })
    .catch(err =>{
        var message={message:"something wrong!",error:err}
        res.json(message);
    }) 
});

module.exports = router;