const express = require('express');
const router = express.Router();
const PickupAssignment = require('../../models/pickup_assignment/pickup_assignment');

// router.get('/retrive_all_pickup_assignments',(req, res)=>{
//     PickupAssignment.find({}, function(err, retrive_all_pickup_assignments){
//         if(err){
//             console.log(err);
//         }
//         else {
//             res.json(retrive_all_pickup_assignments);
//         }
//     });
// });

// router.get('/retrive_pickup_assignment/:id',(req, res)=>{
//     PickupAssignment.find({'_id':req.params.id}, function(err, retrive_pickup_assignment){
//         if(err){
//             console.log(err);
//         }
//         else {
//             res.json(retrive_pickup_assignment);
//         }
//     });
// });

module.exports = router;