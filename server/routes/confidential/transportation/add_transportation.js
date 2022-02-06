const express = require("express");
const router = express.Router();
/* Required Model for store in database*/
const Transportation=require('../../../models/confidential/transportation/transportation')
//Define Route to create new indent 
router.post('/add_transportation',(req,res)=>{
    var newPost = new Transportation({
        
        transportation_charges:req.body.transportation_charges,
        handling_charges:req.body.handling_charges,
        items:req.body.items,
        requestedBy:req.body.userId,
        orderId:req.body.orderId,
        user_id:req.body.user_id,
        vendor_id:req.body.vendor_id,
        purchaseId:req.body.purchaseId,
        purchaseConfirmId:req.body.purchaseConfirmId,


    })
    newPost.save()
    .then(post => {
        var message={message:"successfully Transportation Charges added"};
        res.json(message);
    })
    .catch(err => res.json(err))
});

module.exports = router;