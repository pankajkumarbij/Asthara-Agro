const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Address = require('../../models/address/address');
//Define Route for retrive address of all users
router.get('/retrive_all_address',(req, res)=>{
    Address.find({}, function(err, address){
        if(err){
            console.log(err);
        }
        else {
            res.json(address);
        }
    });
});
//Define Route for Retrive address using specific id
router.get('/retrive_address/:id',(req, res)=>{
    Address.find({'_id':req.params.id}, function(err, address){
        if(err){
            console.log(err);
        }
        else {
            res.json(address);
        }
    });
});
//Define Route for Retrive address using user_id
router.get('/retrive_address_by_userId/:id',(req, res)=>{
    Address.find({'userId':req.params.id}, function(err, address){
        if(err){
            console.log(err);
        }
        else {
            res.json(address);
        }
    });
});

module.exports = router;