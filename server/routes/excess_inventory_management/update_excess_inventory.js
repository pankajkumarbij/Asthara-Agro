const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Excess_inventory = require('../../models/excess_inventory_management/excess_inventory_management');
//Define route for create address
router.put('/update_excess_inventory_by_quantity/:id', (req, res)=>{
    var Inventory = {
        status: req.body.status,
        wastage: req.body.wastage,
        reserved: req.body.reserved,
    }
    Excess_inventory.findOneAndUpdate({'_id':req.params.id}, Inventory)
    .then((data) => {
        if(data){
            var message = { message: "data sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "details  not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});
module.exports = router;