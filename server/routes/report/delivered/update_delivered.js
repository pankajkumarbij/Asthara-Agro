const express = require('express');
const router = express.Router();
const Delivered= require('../../../models/report/delivered/delivered');

router.put('/update_delivered/:id',(req, res) =>{
    var update = {
        accepted_items: req.body.items,
        status: "delivered",
    }
    Delivered.findOneAndUpdate({'_id':req.params.id},update)
    .then((order) => {
        if(order){
            res.json({ message: "Order Delivered Sucessfully" });
        }else{
            res.json({ message: "order not found" });
        }
    }).catch(err => {
        console.log(err);
        res.json({message:"Something went wrong!", success: false, err: err });
    })
});

module.exports = router;
