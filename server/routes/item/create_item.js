const express = require('express');
const router = express.Router();
const Item = require('../../models/item/item');
//Define Route to create the item
router.post('/create_item', (req, res)=>{
    var newItem = new Item({
        item_name: req.body.item_name,
    })
    newItem.save()
    .then(item => {
        var message={message:"sucessfully added!",item:item};
        res.json(message);
    })
    .catch(err =>{
        var message={message:"something went wrong!",error:err};
        res.json(message);
    }) 
});

module.exports = router;