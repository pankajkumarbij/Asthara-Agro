const express = require('express');
const router = express.Router();
const User = require('../../models/user/user');

router.get('/retrive_all_user',(req, res)=>{
    User.find({status:"enabled"}).sort({"_id":-1}).exec(function(err, users){
        if(err){
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
});

router.get('/retrive_user/:id',(req, res)=>{
    User.find({'_id':req.params.id}, function(err, user){
        if(err){
            console.log(err);
        }
        else {
            res.json(user);
        }
    });
});

router.get('/retrive_user_by_email/:email',(req, res)=>{
    User.find({'email':req.params.email}, function(err, user){
        if(err){
            console.log(err);
        }
        else {
            res.json(user);
        }
    });
});

router.get('/retrive_user_by_role/:role',(req, res)=>{
    User.find({'role':req.params.role}, function(err, user){
        if(err){
            console.log(err);
        }
        else {
            res.json(user);
        }
    });
});

router.get('/retrive_all_disabled_user',(req, res)=>{
    User.find({status:"disabled"}, function(err, users){
        if(err){
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
});

router.get('/retrive_all_delete_requests',(req, res)=>{
    User.find({remark:"detete account request sent!" , status:"enabled",role:"customer"}, function(err, vendor){
        if(err){
            console.log(err);
        }
        else {
            res.json(vendor);
        }
    });
});

router.get('/retrive_all_disabled_customer',(req, res)=>{
    User.find({status:"disabled",role:"customer"}, function(err, users){
        if(err){
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
});

module.exports = router;