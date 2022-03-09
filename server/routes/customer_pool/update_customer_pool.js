const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Customer_pool = require('../../models/customer_pool/customer_pool');
//Define route for create customer_pool
router.put('/update_customer_pool/:id', (req, res)=>{
    var customer_pool = {
        pool_name: req.body.pool_name,
        postal_code: req.body.postal_code,
        flag_value:req.body.flag_value,
    }
    Customer_pool.findOneAndUpdate({'_id':req.params.id},customer_pool)
    .then((customer_pool) => {
        if(customer_pool){
            var message = { message: "customer_pool sucessfully updated!" };
            res.json(message);
        }else{
            var message = { message: "customer_pool not found!" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something wrong!",success: false, err: err };
        res.json(message);
    })
});
router.put('/updateflag_customer_pool/:id', (req, res)=>{
    var customer_pool = {
        flag_value:req.body.flag_value,
    }
    Customer_pool.findOneAndUpdate({'_id':req.params.id},customer_pool)
    .then((customer_pool) => {
        if(customer_pool){
            var message = { message: "customer_pool sucessfully updated!" };
            res.json(message);
        }else{
            var message = { message: "customer_pool not found!" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something wrong!",success: false, err: err };
        res.json(message);
    })
});

router.put('/updateflag2_customer_pool/:id', (req, res)=>{
    var customer_pool = {
        flag2_value:req.body.flag_value,
    }
    Customer_pool.findOneAndUpdate({'_id':req.params.id},customer_pool)
    .then((customer_pool) => {
        if(customer_pool){
            var message = { message: "customer_pool sucessfully updated!" };
            res.json(message);
        }else{
            var message = { message: "customer_pool not found!" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;