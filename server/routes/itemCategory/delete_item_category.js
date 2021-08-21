const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const ItemCategory = require('../../models/itemCategory/item_category');
//Define ROute to delete the item category by id
router.get('/delete_item_category/:id',(req, res) =>{ 
    ItemCategory.findOneAndRemove({'_id':req.params.id})
    .then((category) => {
        if(category){
            var message = { success: "category sucessfully deleted" };
            res.json(message);
        }else{
            var message = { error: "category not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;