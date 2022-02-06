const express = require('express');
const router = express.Router();
const Purchase_order = require('../../../models/report/completed_purchase_order/completed_purchase_order');
router.put('/update_flag_completed_purchase_order/:id',(req, res) =>{
    var update = {
        flag:req.body.flag,
    }
    Purchase_order.findOneAndUpdate({'_id':req.params.id},update)
    .then((user) => {
        if(user){
            var message = { message: "user sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "user not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});
module.exports = router;
