const express = require("express");
const router = express.Router();
const Indent=require('../../models/indent/indent')

router.post('/newindent',(req,res)=>{
    var newPost = new Indent({
        requestedBy:req.body.userId,
        orderId:req.body.orderId,
        items:req.body.items,
        user_id:req.body.user_id,
        vendor_id:req.body.vendor_id,
        margin:req.body.margin,

    })
    newPost.save()
    .then(post => {
        var message={message:"successfully indent created"};
        res.json(message);
    })
    .catch(err => res.json(err))
});

module.exports = router;