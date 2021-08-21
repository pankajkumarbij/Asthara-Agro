const express = require("express");
const router = express.Router();
/* Required Model for store in database*/
const inventoryType = require('../../models/inventoryType/inventoryType');
//DEfien Route to delete the inventort type
router.get('/delete_inventory_type/:id',(req, res) =>{ 
    inventoryType.findOneAndRemove({'_id':req.params.id})
    .then((inventorytype) => {
        if(inventorytype){
            var message = { success: "Inventory Type sucessfully deleted" };
            res.json(message);
        }else{
            var message = { error: "Inventory Type Not found" };
            res.json(message);
        }
    }).catch(err => {
        res.json(err);
    })
});

module.exports = router;