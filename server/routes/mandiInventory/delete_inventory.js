const express = require('express');
const router = express.Router();
const MandiInventory=require('../../models/mandiInventory/mandi_inventory');

router.get('/delete_mandi_inventory_by_id/:id',(req, res) =>{ 
    MandiInventory.findOneAndRemove({'_id':req.params.id})
    .then((inventory) => {
        if(inventory){
            res.json({ message: "Inventory sucessfully deleted" });
        }else{
            res.json({ message: "Inventory not found" });
        }
    }).catch(err => {
        console.log(err);
        var message = { message: "Somthing Went Wrong", err: err };
        res.json(message);
    })
});

module.exports = router;