const express = require('express');
const router = express.Router();
const UserCategory = require('../../models/userCategory/user_category');
const verifyUser=require('../../middleware/auth');

router.get('/retrive_all_user_category', (req, res)=>{
    UserCategory.find({status:"enabled"}, function(err, categories){
        if(err){
            console.log(err);
        }
        else {
            res.json(categories);
        }
    });
});
router.get('/retrive_all_users_category', (req, res)=>{
    UserCategory.find({}, function(err, categories){
        if(err){
            console.log(err);
        }
        else {
            res.json(categories);
        }
    });
});

router.get('/retrive_user_category/:id',(req, res)=>{
    UserCategory.find({'_id':req.params.id}, function(err, categories){
        if(err){
            console.log(err);
        }
        else {
            res.json(categories);
        }
    });
});
router.get('/retrive_user_category_type/:type',(req, res)=>{
    UserCategory.find({'category_name':req.params.type}, function(err, categories){
        if(err){
            console.log(err);
        }
        else {
            res.json(categories);
        }
    });
});


router.get('/retrive_all_disabled_user_category',(req, res)=>{
    UserCategory.find({status:"disabled"}, function(err, categories){
        if(err){
            console.log(err);
        }
        else {
            res.json(categories);
        }
    });
});

module.exports = router;