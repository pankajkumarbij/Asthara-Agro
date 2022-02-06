const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const vendor_cross_pool = require('../../models/cross_pool/vendor_customer_cross');
//Define route for create customer_pool
router.get('/delete_vendor_customer_cross_pool/:id',(req, res) =>{ 
    vendor_cross_pool.findOneAndRemove({'_id':req.params.id})
    .then((cross_pool) => {
        if(cross_pool){
            var message = { message: "vendor customer cross pool sucessfully deleted" };
            res.json(message);
        }else{
            var message = { message: "vendor customer cross pool not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something went wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;