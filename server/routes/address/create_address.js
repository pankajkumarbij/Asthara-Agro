const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Address = require('../../models/address/address');
//Define route for create address
router.post('/create_address', (req, res)=>{
    var newAddress = new Address({
        userId: req.body.userId,
        address: req.body.address,
        landmark: req.body.landmark,
        district: req.body.district,
        state: req.body.state,
        country: req.body.country,
        postal_code: req.body.postal_code,
    })
    newAddress.save()
    .then(address => {
        var message={message:"address added succesfully!",address:address}
        res.json(message);
    })
    .catch(err =>{
        var message={message:"something wrong!",error:err}
        res.json(message);
    }) 
});

module.exports = router;