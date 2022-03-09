const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Manager_customer_cross = require('../../models/customer_manager_pool/customer_manager_pool');
//Define route for create customer_pool
router.get('/retrieve_manager_customer_cross_pools',(req, res)=>{
    Manager_customer_cross.find({}, function(err, cross_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(cross_pool);
        }
    });
});
router.get('/retrieve_cross_pool/:id',(req, res)=>{
    Manager_customer_cross.find({_id:req.params.id}, function(err, cross_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(cross_pool);
        }
    });
});

router.get('/retrieve_cross_pool_by_customer_pool/:id',(req, res)=>{
    Manager_customer_cross.find({customer_pool_Id:req.params.id}, function(err, cross_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(cross_pool);
        }
    });
});

router.get('/retrieve_cross_pool_by_manager_pool/:id',(req, res)=>{
    Manager_customer_cross.find({manager_pool_Id:req.params.id}, function(err, cross_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(cross_pool);
        }
    });
});

router.get('/retrieve_cross_pool_by_manager_pool_id/:id',(req, res)=>{
    Manager_customer_cross.find({manager_pool_Id:req.params.id}, function(err, cross_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(cross_pool);
        }
    });
});

module.exports = router;