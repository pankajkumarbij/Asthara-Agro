const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Transport= require('../../../models/transport_labour/transport_labour_for_sales/transport_labour_for_sales');
//Define ROute to  retrive all orders 
router.get('/retrieve_transport_labour_for_sales',(req, res)=>{
    Transport.find(function(err, transport){
        if(err){
            console.log(err);
        }
        else {
            res.json(transport);
        }
    });
});

router.get('/retrieve_transport_labour_for_sales_by_Id/:id',(req, res)=>{
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