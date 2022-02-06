const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const vendor_cross_pool = require('../../models/cross_pool/vendor_customer_cross');
//Define route for create customer_pool
router.get('/retrieve_vendor_customer_cross_pools',(req, res)=>{
    vendor_cross_pool.find({}, function(err, cross_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(cross_pool);
        }
    });
});
router.get('/retrieve_cross_pool/:id',(req, res)=>{
    vendor_cross_pool.find({_id:req.params.id}, function(err, cross_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(cross_pool);
        }
    });
});

router.get('/retrieve_cross_pool_by_customer_pool/:id',(req, res)=>{
    vendor_cross_pool.find({customer_pool_Id:req.params.id}, function(err, cross_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(cross_pool);
        }
    });
});

router.get('/retrieve_cross_pool_by_vendor_pool/:id',(req, res)=>{
    vendor_cross_pool.find({vendor_pool_Id:req.params.id}, function(err, cross_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(cross_pool);
        }
    });
});

module.exports = router;