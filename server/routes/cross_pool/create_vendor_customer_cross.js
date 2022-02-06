const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const vendor_cross_pool = require('../../models/cross_pool/vendor_customer_cross');
//Define route for create customer_pool
router.post('/create_vendor_customer_cross_pool', (req, res)=>{
    var newcross_pool = new vendor_cross_pool({
        customer_pool_Id: req.body.customer_pool_Id,
        vendor_pool_Id: req.body.vendor_pool_Id,
        customer_pool_name: req.body.customer_pool_name,
        vendor_pool_name: req.body.vendor_pool_name
    })
    newcross_pool.save()
    .then(cross_pool => {
        var message={message:" vendor customer cross pool added succesfully!",cross_pool:cross_pool}
        res.json(message);
    })
    .catch(err =>{
        var message={message:"something wrong!",error:err}
        res.json(message);
    }) 
});

module.exports = router;