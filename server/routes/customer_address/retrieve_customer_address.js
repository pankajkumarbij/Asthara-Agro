const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Address = require('../../models/customer_address/customer_address');
const customer_pool = require('../../models/customer_pool/customer_pool');
//Define Route for retrieve address of all users
router.get('/retrieve_customer_item_address',(req, res)=>{
    Address.find({}, function(err, address){
        if(err){
            console.log(err);
        }
        else {
            res.json(address);
        }
    });
});
//Define Route for Retrieve address using specific id
router.get('/retrieve_customer_address/:id',(req, res)=>{
    Address.find({'_id':req.params.id}, function(err, address){
        if(err){
            console.log(err);
        }
        else {
            res.json(address);
        }
    });
});
//Define Route for Retrieve address using user_id
router.get('/retrieve_customer_address_by_customerId/:id',(req, res)=>{
    Address.find({'customerId':req.params.id}, function(err, address){
        if(err){
            console.log(err);
        }
        else {
            res.json(address);
        }
    });
});

//Define Route for Retrieve address by set of pin code
router.get('/retrieve_customer_address_by_pool/:id',(req, res)=>{
    customer_pool.find({_id:req.params.id}, function(err, customer_pool){
        if(err){
            console.log(err);
        }
        else {
            Address.find({'postal_code': { "$in" : customer_pool[0].postal_code}}, function(err, address){
                if(err){
                    console.log(err);
                }
                else {
                    res.json(address);
                }
            });
        }
    });
});

module.exports = router;