const express = require('express');
const router = express.Router();
const PickupAssign = require('../../models/pickup_assign/pickup_assign');

router.get('/retrive_all_pickup_assignment',(req, res)=>{
    PickupAssign.find({}, function(err, pickup_assignments){
        if(err){
            console.log(err);
        }
        else {
            res.json(pickup_assignments);
        }
    });
});

router.get('/retrive_pickup_assignment/:id',(req, res)=>{
    PickupAssign.find({'_id':req.params.id}, function(err, pickup_assignment){
        if(err){
            console.log(err);
        }
        else {
            res.json(pickup_assignment);
        }
    });
});

router.get('/retrive_all_pending_pickup_assignment',(req, res)=>{
    PickupAssign.find({status:"pending for buyer acceptance"}, function(err, pickup_assignments){
        if(err){
            console.log(err);
        }
        else {
            res.json(pickup_assignments);
        }
    });
});
router.get('/retrive_all_accepted_pickup_assignment',(req, res)=>{
    PickupAssign.find({status:"accepted"}, function(err, pickup_assignments){
        if(err){
            console.log(err);
        }
        else {
            res.json(pickup_assignments);
        }
    });
});
router.get('/retrive_all_approved_pickup_assignment',(req, res)=>{
    PickupAssign.find({status:"approved"}, function(err, pickup_assignments){
        if(err){
            console.log(err);
        }
        else {
            res.json(pickup_assignments);
        }
    });
});
router.get('/retrive_all_declined_pickup_assignment',(req, res)=>{
    PickupAssign.find({status:"decline"}, function(err, pickup_assignments){
        if(err){
            console.log(err);
        }
        else {
            res.json(pickup_assignments);
        }
    });
});

module.exports = router;