const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Vendor_pool = require('../../models/vendor_pool/vendor_pool');
//Define route for create Vendor_pool
router.get('/delete_vendor_pool/:id',(req, res) =>{ 
   Vendor_pool.findOneAndRemove({'_id':req.params.id})
    .then((Vendor_pool) => {
        if(Vendor_pool){
            var message = { message: "Vendor_pool sucessfully deleted" };
            res.json(message);
        }else{
            var message = { message: "Vendor_pool not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something went wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;