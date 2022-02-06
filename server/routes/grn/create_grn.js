const express = require("express");
const router = express.Router();
/* Required Model for store in database*/
const Grn=require('../../models/grn/grn')
//DEfine route to create GRN
router.post('/newgrn',(req,res)=>{
    var newPost = new Grn({
        userId:req.body.userId,
        customerId:req.body.customerId,
        createdBy:req.body.userId,
        orderId:req.body.orderId,
        purchaseOrder:req.body.purchaseOrder,
        vendorId:req.body.vendorId,
        indentId:req.body.vendorId,
        invoiceId:req.body.invoiceId,
        item_description:req.body.item_description,
        date_of_issue:req.body.status,
    })
    newPost.save()
    .then(post => {
        res.json(post);
        console.log("save in database");
    })
    .catch(err => res.json(err))
});
//DEfine route to create GRN
router.post('/create_grn',(req,res)=>{
    var newPost = new Grn({
        userId:req.body.userId,
        customerId:req.body.customerId,
        createdBy:req.body.userId,
        orderId:req.body.orderId,
        purchaseOrder:req.body.purchaseOrder,
        vendorId:req.body.vendorId,
        indentId:req.body.vendorId,
        invoiceId:req.body.invoiceId,
        itemd:req.body.items,
        date_of_issue:req.body.date_of_issue,
        status:req.body.status,
        remark:req.body.remark,
    })
    newPost.save()
    .then(post => {
        res.json(post);
        console.log("save in database");
    })
    .catch(err => res.json(err))
});

module.exports = router;