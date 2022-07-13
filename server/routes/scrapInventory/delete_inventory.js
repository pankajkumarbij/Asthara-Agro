const express = require('express');
const router = express.Router();
const ScrapInventory=require('../../models/scrapInventory/scrap_inventory');

router.get('/delete_scrap_inventory_by_id/:id',(req, res) =>{ 
    ScrapInventory.findOneAndRemove({'_id':req.params.id})
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