const express = require('express');
const router = express.Router();
const RejectInventory=require('../../models/rejectInventory/reject_inventory');

router.get('/delete_reject_inventory_by_id/:id',(req, res) =>{ 
    RejectInventory.findOneAndRemove({'_id':req.params.id})
    .then((inventory) => {
        if(inventory){
            var message = { message: "Inventory sucessfully deleted" };
            res.json(message);
        }else{
            var message = { message: "Inventory not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message: false, err: err };
        res.json(message);
    })
});

module.exports = router;