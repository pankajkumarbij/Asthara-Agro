const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const ItemUnit = require('../../models/itemUnit/item_unit');
//DEfine Route to create to item unit
router.post('/create_item_unit', (req, res)=>{
    var newUnit = new ItemUnit({
        unit_name: req.body.unit_name,
    })
    newUnit.save()
    .then(unit => {
        var message={message:"successfully added new unit!",unit:unit};
        res.json(message);
    })
    .catch(err => {
        var message={message:"successfully added new unit!",error:err};
        res.json(message);
    })

        
});

module.exports = router;