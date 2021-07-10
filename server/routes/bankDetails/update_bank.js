const express = require('express');
const router = express.Router();
const Bank = require('../../models/bankDetails/bank');

router.put('/update_bank/:id',(req, res) =>{
    var bank_update = {
        bank_name: req.body.bank_name,
        branch_name: req.body.branch_name,
        account_number: req.body.account_number,
        account_holder_name: req.body.account_holder_name,
        ifsc_code: req.body.ifsc_code,
    }
    Bank.findOneAndUpdate({'_id':req.params.id}, bank_update)
    .then((bank) => {
        if(bank){
            var message = { success: "bank details sucessfully updated" };
            res.json(message);
        }else{
            var message = { error: "bank details not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;