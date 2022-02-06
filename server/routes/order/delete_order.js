const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Order = require('../../models/order/order');
const OrderSummary = require('../../models/order/order_item_summary');
//Define Route to delte order by id
router.get('/delete_order/:id',(req, res) =>{ 
    Order.findOneAndRemove({'_id':req.params.id})
    .then((order) => {
        if(order){
            var message = { message: "order sucessfully deleted" };
            res.json(message);
        }else{
            var message = { message: "Order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message: false, err: err };
        res.json(message);
    })
});

//Define Route to delete order item summary by id
router.get('/delete_order_item_summary/:id',(req, res) =>{ 
    OrderSummary.findOneAndRemove({'_id':req.params.id})
    .then((order) => {
        if(order){
            var message = { message: "order item summary sucessfully deleted" };
            res.json(message);
        }else{
            var message = { message: "Order not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message: false, err: err };
        res.json(message);
    })
});

module.exports = router;