const express = require("express");
const router = express.Router();
/* Required Model for store in database*/
const inventoryType = require('../../models/inventoryType/inventoryType');
//DEfien Route to create inventory type 
router.post('/create_inventory_type',(req,res)=>{
    var newInventoryType = new inventoryType({
        inventory_type: req.body.inventory_type,
    })
    newInventoryType.save()
    .then(inventorytype => {
        res.json(inventorytype);
        console.log("saved in database");
    })
    .catch(err => res.json(err))
});

module.exports = router;