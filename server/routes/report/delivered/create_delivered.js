const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Delivered = require('../../../models/report/delivered/delivered');

//Define Route to create order 
router.post('/make_order_delivery', (req, res)=>{
    var newDelivery = new Delivered({
        order: req.body.order,
    })
    newDelivery.save()
    .then(delivery=> {
        res.json({message:"Now you can make a delivery!",data:delivery});
    })
    .catch(err => {
        var message={message:"Something went wrong!",error:err};
        res.json(message);
    })
});

module.exports = router;