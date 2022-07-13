const express = require("express");
const router = express.Router();
/* Required Model for store in database*/
const ScrapInventory=require('../../models/scrapInventory/scrap_inventory');

//DEfine route to create scrap inventory
router.post('/create_scrap_inventory',(req,res)=>{
    var newScrapInventory = new ScrapInventory({
        order:req.body.order,
    })
    newScrapInventory.save()
    .then(fi => {
        var message={message:"successfully saved",data:fi};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;