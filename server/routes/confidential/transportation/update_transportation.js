const express = require('express');
const router = express.Router();
const Transportation = require('../../../models/confidential/transportation/transportation');

router.put('/update_transportation/:id',(req, res) =>{
    var transportation_update = {
        // transportationId: req.body.transportationId,
        transportation_charges:req.body.transportation_charges,
        handling_charges:req.body.handling_charges,
        items:req.body.items,
    }
    Transportation.findOneAndUpdate({'_id':req.params.id}, transportation_update)
    .then((transportation) => {
        if(transportation){
            var message = { message: "transportation sucessfully updated!" };
            res.json(message);
        }else{
            var message = { message: "transportation not found!" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;