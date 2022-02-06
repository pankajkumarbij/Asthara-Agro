const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Transport= require('../../../models/transport_labour/transport_labour_from_vendor/transport_labour_from_vendor');
//Define ROute to  retrive all orders 
router.get('/retrieve_transport_labour_from_vendor',(req, res)=>{
    Transport.find(function(err, transport){
        if(err){
            console.log(err);
        }
        else {
            res.json(transport);
        }
    });
});

router.get('/retrieve_transport_labour_from_vendor_by_Id/:id',(req, res)=>{
    Transport.find({'_id':req.params.id}, function(err, transport){
       if(err){
           console.log(err);
       }
       else {
           res.json(transport);
       }
   });
});


module.exports = router;