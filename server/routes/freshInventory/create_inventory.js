const express = require("express");
const router = express.Router();
/* Required Model for store in database*/
const FreshInventory=require('../../models/freshInventory/fresh_inventory');

//DEfine route to create fresh inventory
router.post('/create_fresh_inventory',(req,res)=>{
    var newFreshInventory = new FreshInventory({
        order_id:req.body.order_id,
        custom_orderId:req.body.custom_orderId,
        custom_vendorId:req.body.custom_vendorId,
        item_name:req.body.item_name,
        grade:req.body.grade,
        unit:req.body.unit,
        quantity:req.body.quantity,
        price:req.body.price,
        order:req.body.order,
    })
    newFreshInventory.save()
    .then(fi => {
        var message={message:"successfully saved",data:fi};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;