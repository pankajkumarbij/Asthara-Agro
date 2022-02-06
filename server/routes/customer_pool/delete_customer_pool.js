const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const customer_pool = require('../../models/customer_pool/customer_pool');
//Define route for create customer_pool
router.get('/delete_customer_pool/:id',(req, res) =>{ 
   customer_pool.findOneAndRemove({'_id':req.params.id})
    .then((customer_pool) => {
        if(customer_pool){
            var message = { message: "customer_pool sucessfully deleted" };
            res.json(message);
        }else{
            var message = { message: "customer_pool not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something went wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;