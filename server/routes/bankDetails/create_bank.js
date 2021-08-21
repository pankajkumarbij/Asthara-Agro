const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Bank = require('../../models/bankDetails/bank');
//Define Route to create Bank details
router.post('/create_bank', (req, res)=>{
    var newBank = new Bank({
        userId: req.body.userId,
        bank_name: req.body.bank_name,
        branch_name: req.body.branch_name,
        account_number: req.body.account_number,
        account_holder_name: req.body.account_holder_name,
        ifsc_code: req.body.ifsc_code,
    })
    newBank.save()
    .then(bank => {
        var message={message:"Bank details added succesfully!",bank:bank}
        res.json(message);
    })
    .catch(err =>{
        var message={message:"something wrong!",error:err};
        res.json(message);
    })
});

module.exports = router;