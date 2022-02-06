const express = require('express');
const router = express.Router();
const Address = require('../../models/customer_address/customer_address');

router.put('/update_customer_address/:id',(req, res) =>{
    var address_update = {
        address: req.body.address,
        landmark: req.body.landmark,
        district: req.body.district,
        state: req.body.state,
        country: req.body.country,
        postal_code: req.body.postal_code,
    }
    Address.findOneAndUpdate({'_id':req.params.id}, address_update)
    .then((address) => {
        if(address){
            var message = { message: "address sucessfully updated!" };
            res.json(message);
        }else{
            var message = { message: "address not found!" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;