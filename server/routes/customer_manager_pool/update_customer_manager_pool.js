const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Manager_customer_cross = require('../../models/customer_manager_pool/customer_manager_pool');
//Define route for create customer_pool
router.put('/update_manager_customer_cross_pool/:id', (req, res)=>{
    var cross_pool = {
        customer_pool_Id: req.body.customer_pool_Id,
        manager_pool_Id: req.body.manager_pool_Id,
        customer_pool_name: req.body.customer_pool_name,
        manager_pool_name: req.body.manager_pool_name
    }
    Manager_customer_cross.findOneAndUpdate({'_id':req.params.id},cross_pool)
    .then((cross_pool) => {
        if(cross_pool){
            var message = { message: "manager customer croos pool sucessfully updated!" };
            res.json(message);
        }else{
            var message = { message: "manager customer croos pool not found!" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;