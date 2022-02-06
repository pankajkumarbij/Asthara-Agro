const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const customer_pool = require('../../models/customer_pool/customer_pool');
//Define route for create customer_pool
router.get('/retrieve_customer_pools',(req, res)=>{
    customer_pool.find({}, function(err, customer_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(customer_pool);
        }
    });
});
router.get('/retrieve_customer_pool/:id',(req, res)=>{
    customer_pool.find({_id:req.params.id}, function(err, customer_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(customer_pool);
        }
    });
});
module.exports = router;