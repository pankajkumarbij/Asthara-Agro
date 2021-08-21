const express = require("express");
const router = express.Router();
/* Required Model for store in database*/
const inventoryType = require('../../models/inventoryType/inventoryType');
//Deffine Route to update the  inventory type by id
router.put('/update_inventory_type/:id',(req, res) =>{ 
    var newupdate = {
        inventory_type: req.body.inventory_type,
    }
    inventoryType.findOneAndUpdate({'_id':req.params.id},newupdate)
    .then((inventorytype) => {
        if(inventorytype){
            var message = { success: "inventory type sucessfully updated" };
            res.json(message);
        }else{
            var message = { error: "inventory type not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;