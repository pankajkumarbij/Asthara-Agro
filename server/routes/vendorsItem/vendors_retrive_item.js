const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const VendorsItem = require('../../models/vendorsItem/vendors_item');
const vendor_pool = require('../../models/vendor_pool/vendor_pool');
//DEfine Route to retrive all items
router.get('/vendors_retrive_all_item',(req, res)=>{
    VendorsItem.find({status:"enabled"}, function(err, items){
        if(err){
            console.log(err);
        }
        else {
            res.json(items);
        }
    });
});
//Define route to retrive item by item id
router.get('/vendors_retrive_item/:vendorid',(req, res)=>{
    VendorsItem.find({userId:req.params.vendorid}, function(err, item){
        if(err){
            console.log(err);
        }
        else {
            res.json(item);
        }
    });
});
router.get('/retrive_vendor_item/:id',(req, res)=>{
    VendorsItem.find({'_id':req.params.id}, function(err, item){
        if(err){
            console.log(err);
        }
        else {
            res.json(item);
        }
    });
});

router.get('/vendors_retrive_all_disabled_items',(req, res)=>{
    VendorsItem.find({ status: "disabled"}, function(err, items){
        if(err){
            console.log(err);
        }
        else {
            res.json(items);
        }
    });
});

router.get('/retrive_vendor_item_by_name_grade/:itemname/:grade/:id',(req, res)=>{
    vendor_pool.find({_id:req.params.id}, function(err, vendor_pool){
        if(err){
            console.log(err);
        }
        else {
            VendorsItem.find({'postal_code': { "$in" : vendor_pool[0].postal_code}, 'item_name':req.params.itemname, 'grade_name':req.params.grade}).sort({"item_price":-1}).exec(function(err, item){
                if(err){
                    console.log(err);
                }
                else {
                    res.json(item);
                }
            });
        }
    });
});

router.get('/retrive_vendor_item_by_name_grade_lower_price/:itemname/:grade/:id',(req, res)=>{
    vendor_pool.find({_id:req.params.id}, function(err, vendor_pool){
        if(err){
            console.log(err);
        }
        else {
            VendorsItem.find({'postal_code': { "$in" : vendor_pool[0].postal_code}, 'item_name':req.params.itemname, 'grade_name':req.params.grade},{'nick_name':1,'userId':1, 'postal_code':1, 'date':1}).sort({"item_price":1}).exec(function(err, item){
                if(err){
                    console.log(err);
                }
                else {
                    res.json(item);
                }
            });
        }
    });
});

router.get('/vendors_retrive_all_item_by_vendor_pool/:id',(req, res)=>{
    vendor_pool.find({_id:req.params.id}, function(err, vendor_pool){
        if(err){
            console.log(err);
        }
        else {
            VendorsItem.find({'postal_code': { "$in" : vendor_pool[0].postal_code}}, function(err, item){
                if(err){
                    console.log(err);
                }
                else {
                    res.json(item);
                }
            });
        }
    });
});

router.get('/retrive_vendor_item_by_access_details/:itemname/:grade/:vendorid',(req, res)=>{
    VendorsItem.find({userId:req.params.vendorid, grade_name:req.params.grade, item_name:req.params.itemname}, function(err, item){
        if(err){
            console.log(err);
        }
        else {
            res.json(item);
        }
    });
});

module.exports = router;