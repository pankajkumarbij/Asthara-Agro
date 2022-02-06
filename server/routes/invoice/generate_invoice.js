const express = require("express");
const router = express.Router();
const Invoice=require('../../models/invoice/invoice')

router.post('/newinvoice',(req,res)=>{
    var newPost = new Invoice({
        userId:req.body.userId,
        customerId:req.body.customerId,
        createdBy:req.body.userId,
        orderId:req.body.orderId,
        purchaseOrder:req.body.purchaseOrder,
        vendorId:req.body.vendorId,
        indentId:req.body.vendorId,
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
router.post('/generate_invoice',(req,res)=>{
    var newPost = new Invoice({
        userId:req.body.userId,
        customerId:req.body.customerId,
        createdBy:req.body.userId,
        orderId:req.body.orderId,
        indentId:req.body.indentId,
        purchaseId:req.body.purchaseId,
        vendorId:req.body.vendorId,
        indentId:req.body.indentId,
        items:req.body.items,
        date_of_issue:req.body.date_of_issue,
    })
    newPost.save()
    .then(post => {
        res.json(post);
        console.log("save in database");
    })
    .catch(err => res.json(err))
});
module.exports = router;