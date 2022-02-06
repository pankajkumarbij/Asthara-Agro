const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const manager_pool = require('../../models/manager_pool/manager_pool');
//Define route for create manager_pool
router.get('/retrieve_manager_pools',(req, res)=>{
    manager_pool.find({}, function(err, manager_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(manager_pool);
        }
    });
});
router.get('/retrieve_manager_pool/:id',(req, res)=>{
    manager_pool.find({_id:req.params.id}, function(err, manager_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(manager_pool);
        }
    });
});
module.exports = router;