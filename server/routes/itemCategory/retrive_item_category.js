const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const ItemCategory = require('../../models/itemCategory/item_category');
//DEfien the Route retrive all item category 
router.get('/retrive_all_item_category',(req, res)=>{
    ItemCategory.find({}, function(err, categories){
        if(err){
            console.log(err);
        }
        else {
            res.json(categories);
        }
    });
});
//Define route to item category by id
router.get('/retrive_item_category/:id',(req, res)=>{
    ItemCategory.find({'_id':req.params.id}, function(err, categories){
        if(err){
            console.log(err);
        }
        else {
            res.json(categories);
        }
    });
});

module.exports = router;