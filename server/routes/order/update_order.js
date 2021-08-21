const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Order = require('../../models/order/order');
//Define Route update order by id
router.put('/update_order/:id',(req, res) =>{
    var order_update = {
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
    }
    Order.findOneAndUpdate({'_id':req.params.id}, order_update)
    .then((order) => {
        if(order){
            var message = { message: "order sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});
//define route update to status by id
router.put('/update_status/:id',(req, res) =>{
    var order_update = {
        status: req.body.status,
    }
    Order.findOneAndUpdate({'_id':req.params.id}, order_update)
    .then((order) => {
        if(order){
            var message = { message: "Status sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"something went wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;