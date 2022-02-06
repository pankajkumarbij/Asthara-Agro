const express = require('express');
const router = express.Router();
const DeliveryAssign = require('../../models/delivery_assign/delivery_assign');

router.get('/retrive_all_delivery_assignment',(req, res)=>{
    DeliveryAssign.find({}, function(err, delivery_assignments){
        if(err){
            console.log(err);
        }
        else {
            res.json(delivery_assignments);
        }
    });
});

router.get('/retrive_delivery_assign/:id',(req, res)=>{
    DeliveryAssign.find({'_id':req.params.id}, function(err, delivery_assign){
        if(err){
            console.log(err);
        }
        else {
            res.json(delivery_assign);
        }
    });
});

router.get('/retrive_delivery/:id',(req, res)=>{
    DeliveryAssign.find({'_id':req.params.id}, function(err, delivery_assignment){
        if(err){
            console.log(err);
        }
        else {
            res.json(delivery_assignment);
        }
    });
});

router.get('/retrive_all_pending_delivery_assignment',(req, res)=>{
    DeliveryAssign.find({status:"pending for sales acceptance"}, function(err, delivery_assignments){
        if(err){
            console.log(err);
        }
        else {
            res.json(delivery_assignments);
        }
    });
});
router.get('/retrive_all_accepted_delivery_assignment',(req, res)=>{
    DeliveryAssign.find({status:"sales accepted"}, function(err, delivery_assignments){
        if(err){
            console.log(err);
        }
        else {
            res.json(delivery_assignments);
        }
    });
});
router.get('/retrive_all_approved_delivery_assignment',(req, res)=>{
    DeliveryAssign.find({status:"approved"}, function(err, delivery_assignments){
        if(err){
            console.log(err);
        }
        else {
            res.json(delivery_assignments);
        }
    });
});
router.get('/retrive_all_declined_delivery_assignment',(req, res)=>{
    DeliveryAssign.find({status:"decline"}, function(err, delivery_assignments){
        if(err){
            console.log(err);
        }
        else {
            res.json(delivery_assignments);
        }
    });
});

module.exports = router;