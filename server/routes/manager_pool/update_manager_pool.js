const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Manager_pool = require('../../models/manager_pool/manager_pool');
//Define route for create manager_pool
router.put('/update_manager_pool/:id',(req, res) =>{
    var manager_pool = {
       pool_name: req.body.pool_name,
        postal_code: req.body.postal_code,
        flag_value:req.body.flag_value,
    }
    Manager_pool.findOneAndUpdate({'_id':req.params.id}, manager_pool)
    .then((user) => {
        if(user){
            var message = { message: "manager pool sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "manager pool not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});
router.put('/updateflag_manager_pool/:id',(req, res) =>{
    var manager_pool = {
        flag_value:req.body.flag_value,
    }
    
    Manager_pool.findOneAndUpdate({'_id':req.params.id}, manager_pool)
    .then((user) => {
        if(user){
            var message = { message: "manager pool sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "manager pool not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});

module.exports = router;