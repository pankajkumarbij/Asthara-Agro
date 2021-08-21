const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const ItemUnit = require('../../models/itemUnit/item_unit');
//Define ROute to delete the item unit by id
router.get('/delete_item_unit/:id',(req, res) =>{ 
    ItemUnit.findOneAndRemove({'_id':req.params.id})
    .then((unit) => {
        if(unit){
            var message = { success: "unit sucessfully deleted" };
            res.json(message);
        }else{
            var message = { error: "unit not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;