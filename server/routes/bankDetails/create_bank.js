const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Bank = require('../../models/bankDetails/bank');
//Define Route to create Bank details
router.post('/create_bank', (req, res)=>{
    if(req.body.account_number  === req.body.confirm_AccountNumber){
        var newBank = new Bank({
            userId: req.body.userId,
            bank_name: req.body.bank_name,
            branch_name: req.body.branch_name,
            account_number: req.body.account_number,
            account_holder_name: req.body.account_holder_name,
            ifsc_code: req.body.ifsc_code,
            account_type: req.body.account_type,
        })
        newBank.save()
        .then(bank => {
            var message={message:"Bank details added succesfully!",bank:bank}
            res.json(message);
        })
        .catch(err =>{
            var message={message:"something wrong!",error:err,bank:""};
            res.json(message);
        })
    }
    else{
        var message = { message:"Account Number is not match",bank:"" };
        res.json(message);
    }
});
module.exports = router;