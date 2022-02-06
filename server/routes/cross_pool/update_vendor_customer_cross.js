const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const vendor_cross_pool = require('../../models/cross_pool/vendor_customer_cross');
//Define route for create customer_pool
router.put('/update_vendor_customer_cross_pool/:id', (req, res)=>{
    var cross_pool = {
        customer_pool_Id: req.body.customer_pool_Id,
        vendor_pool_Id: req.body.vendor_pool_Id,
        customer_pool_name: req.body.customer_pool_name,
        vendor_pool_name: req.body.vendor_pool_name
    }
    vendor_cross_pool.findOneAndUpdate({'_id':req.params.id},cross_pool)
    .then((cross_pool) => {
        if(cross_pool){
            var message = { message: "vendor customer croos pool sucessfully updated!" };
            res.json(message);
        }else{
            var message = { message: "vendor customer croos pool not found!" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;