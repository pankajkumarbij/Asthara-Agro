const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const ScrapInventory=require('../../models/scrapInventory/scrap_inventory');

//Define ROute to  retrive all orders 
router.get('/retrive_scrap_inventory',(req, res)=>{
    ScrapInventory.find(function(err, fi){
        if(err){
            console.log(err);
        }
        else {
            res.json(fi);
        }
    });
});

router.get('/retrive_scrap_inventory_by_id/:id',(req, res)=>{
    ScrapInventory.find({'_id':req.params.id}, function(err, fi){
       if(err){
           console.log(err);
       }
       else {
           res.json(fi);
       }
   });
});

module.exports = router;