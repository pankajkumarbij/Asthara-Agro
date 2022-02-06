const express = require('express');
const router = express.Router();
const UpdateDelivery = require('../../models/update_delivery/update_delivery');

router.get('/retrive_all_update_delivery',(req, res)=>{
    UpdateDelivery.find({}, function(err, Deliveries){
        if(err){
            console.log(err);
        }
        else {
            res.json(Deliveries);
        }
    });
});

router.get('/retrive_update_delivery/:id',(req, res)=>{
    UpdateDelivery.find({'_id':req.params.id}, function(err, delivery){
        if(err){
            console.log(err);
        }
        else {
            res.json(delivery);
        }
    });
});

// router.get('/retrive_delivery/:id',(req, res)=>{
//     UpdateDelivery.find({'_id':req.params.id}, function(err, delivery){
//         if(err){
//             console.log(err);
//         }
//         else {
//             res.json(delivery);
//         }
//     });
// });

// router.get('/retrive_all_delivery',(req, res)=>{
//     UpdateDelivery.find({}, function(err, Deliveries){
//         if(err){
//             console.log(err);
//         }
//         else {
//             res.json(Deliveries);
//         }
//     });
// });
router.get('/retrive_all_accepted_update_delivery',(req, res)=>{
    UpdateDelivery.find({status:"Customer Accepted"}, function(err, Deliveries){
        if(err){
            console.log(err);
        }
        else {
            res.json(Deliveries);
        }
    });
});
router.get('/retrive_all_declined_delivery',(req, res)=>{
    UpdateDelivery.find({status:"decline"}, function(err, Deliveries){
        if(err){
            console.log(err);
        }
        else {
            res.json(Deliveries);
        }
    });
});

module.exports = router;