const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Manager_customer_cross = require('../../models/customer_manager_pool/customer_manager_pool');
//Define route for create customer_pool
router.post('/create_manager_customer_cross_pool', (req, res)=>{
    var newcross_pool = new Manager_customer_cross({
        customer_pool_Id: req.body.customer_pool_Id,
        manager_pool_Id: req.body.manager_pool_Id,
        customer_pool_name: req.body.customer_pool_name,
        manager_pool_name: req.body.manager_pool_name
    })
    newcross_pool.save()
    .then(cross_pool => {
        var message={message:" manager customer cross pool added succesfully!",cross_pool:cross_pool}
        res.json(message);
    })
    .catch(err =>{
        var message={message:"something wrong!",error:err}
        res.json(message);
    }) 
});

module.exports = router;