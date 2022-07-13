const express = require("express");
const router = express.Router();
/* Required Model for store in database*/
const MandiInventory=require('../../models/mandiInventory/mandi_inventory');

//DEfine route to create mandi inventory
router.post('/create_mandi_inventory',(req,res)=>{
    var newMandiInventory = new MandiInventory({
        order:req.body.order,
    })
    newMandiInventory.save()
    .then(fi => {
        var message={message:"successfully saved",data:fi};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;