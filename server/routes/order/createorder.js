const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Order = require('../../models/order/order');
//Define Route to create order 
router.post('/create_order', (req, res)=>{
    var newOrder = new Order({
        name: req.body.name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        address: req.body.address,
        landmark: req.body.landmark,
        district: req.body.district,
        state: req.body.state,
        country: req.body.country,
        postal_code: req.body.postal_code,
        items: req.body.items,
    })
    newOrder.save()
    .then(order => {
        var message={message:"your order has been Successfully submitted!",order:order};
        res.json(message);
    })
    .catch(err => {
        var message={message:"Something went wrong!",error:err};
        res.json(message);
    })
});

module.exports = router;