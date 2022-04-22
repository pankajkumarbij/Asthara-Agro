const express = require('express');
const router = express.Router();
const VendorsItem = require('../../models/vendorsItem/vendors_item');

router.put('/vendors_update_item/:id',(req, res) =>{
    var item_update = {
        category: req.body.category,
        grade: req.body.grade,
        unit: req.body.unit,
        added_by: req.body.added_by,
        item_name: req.body.item_name,
        category_name: req.body.category_name,
        grade_name: req.body.grade_name,
        description: req.body.description,
        unit_name:req.body.unit_name,
        item_price:req.body.item_price,
        item_quantity:req.body.item_quantity,
        address: req.body.address,
        landmark: req.body.landmark,
        district: req.body.district,
        state: req.body.state,
        country: req.body.country,
        postal_code: req.body.postal_code,
        min_quantity: req.body.min_quantity,
        buyer_approval_status:"pending"
    }
    VendorsItem.findOneAndUpdate({'_id':req.params.id}, item_update)
    .then((item) => {
        if(item){
            var message = {message: "item sucessfully updated" };
            res.json(message);
        }else{
            var message = { error: "item not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message: false, err: err };
        res.json(message);
    })
});
router.put('/vendors_update_item_buyer_status/:id',(req, res) =>{
    var item_update = {
        buyer_approval_status:req.body.buyer_approval_status,
    }
    VendorsItem.findOneAndUpdate({'_id':req.params.id}, item_update)
    .then((item) => {
        if(item){
            var message = {message: "item sucessfully updated" };
            res.json(message);
        }else{
            var message = { error: "item not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message: false, err: err };
        res.json(message);
    })
});

router.put('/vendors_item_buyer_assign/:id',(req, res) =>{
    var item_update = {
        buyer_id: req.body.buyer_id,
        buyer_email: req.body.buyer_email,
    }
    VendorsItem.findOneAndUpdate({'_id':req.params.id}, item_update)
    .then((item) => {
        if(item){
            var message = {message: "Buyer Assign sucessfully" };
            res.json(message);
        }else{
            var message = { error: "item not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message: false, err: err };
        res.json(message);
    })
});

module.exports = router;