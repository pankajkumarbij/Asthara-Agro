const express = require('express');
const router = express.Router();
const User = require('../../models/user/user');

router.put('/update_user/:id',(req, res) =>{
    var user_update = {
        category: req.body.category,
        role: req.body.role,
        full_name: req.body.full_name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        idType: req.body.idType,
        idNumber: req.body.idNumber,
        address: req.body.address,
        gst_no: req.body.gst_no,
        pool_name: req.body.pool_name,
        pool_id: req.body.pool_id,
        bank_details: req.body.bank_details,
    }
    User.findOneAndUpdate({'_id':req.params.id}, user_update)
    .then((user) => {
        if(user){
            var message = { message: "user sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "user not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});
router.put('/send_delete_account_remark/:id',(req, res) =>{
    var user_update = {
        remark: req.body.remark,
    }
    User.findOneAndUpdate({'_id':req.params.id}, user_update)
    .then((user) => {
        if(user){
            var message = { message: "delete account request sucessfully send" };
            res.json(message);
        }else{
            var message = { message: "user ssss not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});



router.put('/update_customer_status/:id',(req, res) =>{
    var status = {
        status: req.body.status,
    }
   User.findOneAndUpdate({'_id':req.params.id}, status)
    .then((status) => {
        if(status){
            var message = { message: "customer status updated successfully " };
            res.json(message);
        }else{
            var message = { message: "customer not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"somthing went wrong!",success: false, err: err };
        res.json(message);
    })
});
router.put('/enable_customer/:id',(req, res) =>{
    var status = {
        status: req.body.status,
        remark:req.body.remark,
    }
   User.findOneAndUpdate({'_id':req.params.id}, status)
    .then((status) => {
        if(status){
            var message = { message: "customer enabled successfully " };
            res.json(message);
        }else{
            var message = { message: "customer not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"somthing went wrong!",success: false, err: err };
        res.json(message);
    })
});


router.put('/update_customer_remark/:id',(req, res) =>{
    var remark = {
        remark: req.body.remark,
    }
   User.findOneAndUpdate({'_id':req.params.id}, remark)
    .then((remark) => {
        if(remark){
            var message = { message: "customer account delete request rejected " };
            res.json(message);
        }else{
            var message = { message: "customer not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"somthing went wrong!",success: false, err: err };
        res.json(message);
    })
});


module.exports = router;