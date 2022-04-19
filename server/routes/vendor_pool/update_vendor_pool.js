const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Vendor_pool = require('../../models/vendor_pool/vendor_pool');
//Define route for create Vendor_pool
router.put('/update_vendor_pool/:id',(req, res) =>{
    var vendor_pool = {
       pool_name: req.body.pool_name,
        postal_code: req.body.postal_code,
        // flag_value:req.body.flag_value,
    }
    Vendor_pool.findOneAndUpdate({'_id':req.params.id}, vendor_pool)
    .then((user) => {
        if(user){
            var message = { message: "vendor pool sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "vendor pool not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});
// router.put('/updateflag_vendor_pool/:id',(req, res) =>{
//     var vendor_pool = {
//         flag_value:req.body.flag_value,
//     }
//     Vendor_pool.findOneAndUpdate({'_id':req.params.id}, vendor_pool)
//     .then((user) => {
//         if(user){
//             var message = { message: "vendor pool sucessfully updated" };
//             res.json(message);
//         }else{
//             var message = { message: "vendor pool not found" };
//             res.json(message);
//         }
//     }).catch(err => {
//         console.log(err);
//         var message = {message:"Something went wrong!", success: false, err: err };
//         res.json(message);
//     })
// });

module.exports = router;