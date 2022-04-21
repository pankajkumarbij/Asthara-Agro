const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Vendor_pool = require('../../models/vendor_pool/vendor_pool');
//Define route for create Vendor_pool
router.get('/retrieve_vendor_pools',(req, res)=>{
    Vendor_pool.find({}, function(err, Vendor_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(Vendor_pool);
        }
    });
});
router.get('/retrieve_vendor_pool/:id',(req, res)=>{
    Vendor_pool.find({_id:req.params.id}, function(err, Vendor_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(Vendor_pool);
        }
    });
});
router.get('/retrieve_vendor_pools/:pincode',(req, res)=>{
    Vendor_pool.find({_id:req.params.id}, function(err, Vendor_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(Vendor_pool);
        }
    });
});
module.exports = router;