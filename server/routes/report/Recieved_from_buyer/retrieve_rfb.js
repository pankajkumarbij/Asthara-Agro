const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Recieved_from_buyer = require('../../../models/report/recieved_from_buyer/received_from_buyer');

//Define ROute to  retrive all orders 
router.get('/retrive_rfb',(req, res)=>{
    Recieved_from_buyer.find(function(err, orders){
        if(err){
            console.log(err);
        }
        else {
            res.json(orders);
        }
    });
});

router.get('/retrive_rfb_by_id/:id',(req, res)=>{
    Recieved_from_buyer.find({'_id':req.params.id}, function(err, order){
       if(err){
           console.log(err);
       }
       else {
           res.json(order);
       }
   });
});


module.exports = router;