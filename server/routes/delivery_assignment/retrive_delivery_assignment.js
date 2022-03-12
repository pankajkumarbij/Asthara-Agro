const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const DeliveryAssignment = require('../../models/delivery_assignment/delivery_assignment');
//DEfine route to get details of delivery 
router.get('/retrive_all_delivery_assignments',(req, res)=>{
    DeliveryAssignment.find({}, function(err, retrive_all_delivery_assignments){
        if(err){
            console.log(err);
        }
        else {
            console.log(retrive_all_delivery_assignments)
            res.json(retrive_all_delivery_assignments);
        }
    });
});
//Define route to get details of delivery assignment by id
router.get('/retrive_delivery_assignments/:id',(req, res)=>{
    DeliveryAssignment.find({'_id':req.params.id}, function(err, retrive_delivery_assignment){
        if(err){
            console.log(err);
        }
        else {
            res.json(retrive_delivery_assignment);
        }
    });
});
router.get('/retrive_all_pending_delivery_assignments',(req, res)=>{
    DeliveryAssignment.find({status:"pending for sales"}, function(err, retrive_all_pending_delivery_assignments){
        if(err){
            console.log(err);
        }
        else {
            res.json(retrive_all_pending_delivery_assignments);
        }
    });
});

router.get('/retrive_all_delivered_delivery_assignments',(req, res)=>{
    DeliveryAssignment.find({status:"delivered"}, function(err, retrive_all_pending_delivery_assignments){
        if(err){
            console.log(err);
        }
        else {
            res.json(retrive_all_delivered_delivery_assignments);
        }
    });
});
module.exports = router;