const express = require('express');
const router = express.Router();
const PickupAssignConfirm = require('../../models/pickup_assign_confirm/pickup_assign_confirm');

router.get('/retrive_all_pickup_assignment_confirm',(req, res)=>{
    PickupAssignConfirm.find({}, function(err, pickup_assignments_confirm){
        if(err){
            console.log(err);
        }
        else {
            res.json(pickup_assignments_confirm);
        }
    });
});

router.get('/retrive_pickup_assignment_confirm/:id',(req, res)=>{
    PickupAssignConfirm.find({'_id':req.params.id}, function(err, pickup_assignment_confirm){
        if(err){
            console.log(err);
        }
        else {
            res.json(pickup_assignment_confirm);
        }
    });
});

router.get('/retrive_all_pending_pickup_assignment_confirm',(req, res)=>{
    PickupAssignConfirm.find({status:"pending for vendor acceptance"}, function(err, pickup_assignments_confirm){
        if(err){
            console.log(err);
        }
        else {
            res.json(pickup_assignments_confirm);
        }
    });
});
router.get('/retrive_all_accepted_pickup_assignment_confirm',(req, res)=>{
    PickupAssignConfirm.find({status:"accepted"}, function(err, pickup_assignments_confirm){
        if(err){
            console.log(err);
        }
        else {
            res.json(pickup_assignments_confirm);
        }
    });
});

router.get('/retrive_all_accepted_pickup_assignment_confirm_buyer',(req, res)=>{
    PickupAssignConfirm.find({status:"vendor accepted"}, function(err, pickup_assignments_confirm){
        if(err){
            console.log(err);
        }
        else {
            res.json(pickup_assignments_confirm);
        }
    });
});
router.get('/retrive_all_approved_pickup_assignment_confirm',(req, res)=>{
    PickupAssignConfirm.find({status:"approved"}, function(err, pickup_assignments_confirm){
        if(err){
            console.log(err);
        }
        else {
            res.json(pickup_assignments_confirm);
        }
    });
});
router.get('/retrive_all_declined_pickup_assignment_confirm',(req, res)=>{
    PickupAssignConfirm.find({status:"decline"}, function(err, pickup_assignments_confirm){
        if(err){
            console.log(err);
        }
        else {
            res.json(pickup_assignments_confirm);
        }
    });
});

module.exports = router;