const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Bank = require('../../models/bankDetails/bank');
//Define route to delete bank details
router.get('/delete_bank/:id',(req, res) =>{ 
    Bank.findOneAndRemove({'_id':req.params.id})
    .then((bank) => {
        if(bank){
            var message = { message: "bank details sucessfully deleted!" };
            res.json(message);
        }else{
            var message = { message: "bank details not found!" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"something went wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;