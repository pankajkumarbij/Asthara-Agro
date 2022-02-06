const express = require('express');
const router = express.Router();
const DeliveryAssignment = require('../../models/delivery_assignment/delivery_assignment');

router.put('/update_delivery_assignment/:id',(req, res) =>{
    var delivery_assignment_update = {
         user_id:req.body.user_id,
    }
    DeliveryAssignment.findOneAndUpdate({'_id':req.params.id}, delivery_assignment_update)
    .then((delivery_assignment) => {
        if(delivery_assignment){
            var message = { message: "delivery assignment sucessfully updated!" };
            res.json(message);
        }else{
            var message = { message: "delivery assignment not found!" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something wrong!",success: false, err: err };
        res.json(message);
    })
});

router.put('/update_delivery_assignment_status/:id',(req, res) =>{
    var delivery_assignment_update = {
         status:req.body.status,
    }
    DeliveryAssignment.findOneAndUpdate({'_id':req.params.id}, delivery_assignment_update)
    .then((delivery_assignment) => {
        if(delivery_assignment){
            var message = { message: "delivery assignment sucessfully updated!" };
            res.json(message);
        }else{
            var message = { message: "delivery assignment not found!" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;