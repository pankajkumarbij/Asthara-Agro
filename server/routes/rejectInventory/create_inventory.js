const express = require("express");
const router = express.Router();
/* Required Model for store in database*/
const RejectInventory=require('../../models/rejectInventory/reject_inventory');

//DEfine route to create reject inventory
router.post('/create_reject_inventory',(req,res)=>{
    var newRejectInventory = new RejectInventory({
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
    newRejectInventory.save()
    .then(fi => {
        var message={message:"successfully saved",data:fi};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;