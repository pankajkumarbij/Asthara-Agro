const express = require("express");
const router = express.Router();
/* Required Model for store in database*/
const Grn=require('../../models/grn/grn')
//DEfine Route to delete GRN by id
router.get('/deletegrn/:id',(req, res) =>{ 
    Grn.findOneAndRemove({'_id':req.params.id})
    .then((Grn) => {
        if(Grn){
            var message = { success: "sucessfully deleted" };
            res.json(message);
        }else{
            var message = { error: "Grn not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;