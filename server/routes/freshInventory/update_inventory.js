const express = require('express');
const router = express.Router();
const FreshInventory=require('../../models/freshInventory/fresh_inventory');

router.put('/update_fresh inventory/:custom_orderId/:item_name/:grade',(req, res) =>{
    var fresh_inventory_update = {
        quantity: req.body.quantity,
    }
    FreshInventory.findOneAndUpdate({'custom_orderId':req.params.custom_orderId, 'item_name':req.params.item_name, 'grade':req.params.grade}, fresh_inventory_update)
    .then((freshInventory) => {
        if(freshInventory){
            var message = {message: "fresh inventory sucessfully updated" };
            res.json(message);
        }else{
            var message = { error: "fresh inventory not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message: false, err: err };
        res.json(message);
    })
});

module.exports = router;