const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const RejectedItems = require('../../models/rejectedItems/rejectedItems');

//Define Route to create order 
router.post('/create_rejected_items', (req, res)=>{
    var newRejectedItems = new RejectedItems({
        order_id: req.body.order_id,
        custom_orderId: req.body.custom_orderId,
        item_name: req.body.item_name,
        unit: req.body.unit,
        quantity: req.body.quantity,
        final_price: req.body.final_price,
        negotiate_price: req.body.negotiate_price,
    })
    newRejectedItems.save()
    .then(rejectedItems=> {
        res.json({message:"successfully rejected items saved!",data:rejectedItems});
    })
    .catch(err => {
        var message={message:"Something went wrong!",error:err};
        res.json(message);
    })
});

module.exports = router;