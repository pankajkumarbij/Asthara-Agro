const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Excess_inventory = require('../../models/excess_inventory_management/excess_inventory_management');
//Define route for create address
router.post('/create_excess_inventory', (req, res)=>{
    var newInventory = new Excess_inventory({
        vendorId: req.body.vendorId,
        buyerId: req.body.buyerId,
        items: req.body.items,
        excess_quantity: req.body.excess_quantity,
        reserved: req.body.reserved,
        // status: req.body.status,
        // wastage: req.body.wastage,
    })
    newInventory.save()
    .then(data => {
        var message={message:"data added succesfully!",data:data}
        res.json(message);
    })
    .catch(err =>{
        var message={message:"something wrong!",error:err}
        res.json(message);
    }) 
});

module.exports = router;