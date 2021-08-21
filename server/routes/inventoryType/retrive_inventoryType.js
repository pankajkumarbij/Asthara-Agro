const express = require("express");
const router = express.Router();
/* Required Model for store in database*/
const inventoryType = require('../../models/inventoryType/inventoryType');
//Defien Route to retrive all inventory type
router.get('/retrive_all_inventory_type',(req, res)=>{
        inventoryType.find({}, function(err, inventorytype){
        if(err){
            console.log(err);
        }
        else{
            res.json(inventorytype);
        }
    });
});
//DEfien route to retrive all inventory type by id
router.get('/retrive_inventory_type/:id',(req, res)=>{
        inventoryType.find({'_id':req.params.id}, function(err, inventorytype){
        if(err){
            console.log(err);
        }
        else{
            res.json(inventorytype);
        }
    });
});

module.exports = router;
