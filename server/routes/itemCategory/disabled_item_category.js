const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const ItemCategory = require('../../models/itemCategory/item_category');
//DEfine Route to update item category by id
router.put('/disabled_item_category/:id',(req, res) =>{
    var category_update = {
        status: req.body.status,
    }
    ItemCategory.findOneAndUpdate({'_id':req.params.id}, category_update)
    .then((category) => {
        if(category){
            var message = { message: "item category disabled sucessfully " };
            res.json(message);
        }else{
            var message = { message: "item category not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"something went wrong!", success: false, err: err };
        res.json(message);
    })
});

module.exports = router;