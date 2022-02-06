const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const ItemGrade = require('../../models/itemGrade/item_grade');
//Define Route for update item garde by id
router.put('/disabled_item_grade/:id',(req, res) =>{
    var grade_update = {
        status: req.body.status,
    }
    ItemGrade.findOneAndUpdate({'_id':req.params.id}, grade_update)
    .then((grade) => {
        if(grade){
            var message = { message: "item grade disabled sucessfully" };
            res.json(message);
        }else{
            var message = { message: "item grade not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"something went wrong!", success: false, err: err };
        res.json(message);
    })
});

module.exports = router;