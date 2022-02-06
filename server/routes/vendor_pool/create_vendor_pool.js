const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const vendor_pool = require('../../models/vendor_pool/vendor_pool');
//Define route for create Vendor_pool
router.post('/create_vendor_pool', (req, res) => {
    vendor_pool.init()
        .then( async ()=>{
            var newvendor_pool = new vendor_pool({
                pool_name : req.body.pool_name,
                postal_code: req.body.postal_code,
            })
          const result = await newvendor_pool.save();
          var message={message:" vendor_pool added succesfully!",vendor_pool:result}
          res.json(message);

        })
        .catch((err) => {
            var message={message:"something wrong!",error:err}
            res.json(message);
        });
})

module.exports = router;