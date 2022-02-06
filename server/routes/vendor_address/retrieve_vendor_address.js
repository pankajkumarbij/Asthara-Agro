const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Address = require('../../models/vendor_address/vendor_address');
//Define Route for retrieve address of all users
router.get('/retrieve_vendor_item_address',(req, res)=>{
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
router.get('/retrieve_vendor_address/:id',(req, res)=>{
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
router.get('/retrieve_vendor_address_by_vendorId/:id',(req, res)=>{
    Address.find({'vendorId':req.params.id}, function(err, address){
        if(err){
            console.log(err);
        }
        else {
            res.json(address);
        }
    });
});

//Define Route for Retrieve address using user_id and pincode
router.get('/vendors_retrive_item_by_vendorid_pincode/:id/:pincode',(req, res)=>{
    Address.find({'vendorId':req.params.id, 'postal_code':req.params.pincode}, function(err, address){
        if(err){
            console.log(err);
        }
        else {
            res.json(address);
        }
    });
});

module.exports = router;