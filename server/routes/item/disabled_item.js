const express = require('express');
const router = express.Router();
const Item = require('../../models/item/item');

router.put('/disabled_item/:id',(req, res) =>{
    var item_disabled = {
    
        status:req.body.status,
    }
    Item.findOneAndUpdate({'_id':req.params.id}, item_disabled)
    .then((item) => {
        if(item){
            var message = {message: "item disabled sucessfully" };
            res.json(message);
        }else{
            var message = { error: "item not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message: false, err: err };
        res.json(message);
    })
});

module.exports = router;