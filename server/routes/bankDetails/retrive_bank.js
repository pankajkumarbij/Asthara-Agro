const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Bank = require('../../models/bankDetails/bank');
//DEfien Route to get bank details of all users
router.get('/retrive_all_bank',(req, res)=>{
    Bank.find({}, function(err, bank){
        if(err){
            console.log(err);
        }
        else {
            res.json(bank);
        }
    });
});
//Define Routes to get Bnak details by id
router.get('/retrive_bank/:id',(req, res)=>{
    Bank.find({'_id':req.params.id}, function(err, bank){
        if(err){
            console.log(err);
        }
        else {
            res.json(bank);
        }
    });
});
//Define ROutes to get Bank details of specific user
router.get('/retrive_bank_by_userId/:id',(req, res)=>{
    Bank.find({'userId':req.params.id}, function(err, bank){
        if(err){
            console.log(err);
        }
        else {
            res.json(bank);
        }
    });
});

module.exports = router;