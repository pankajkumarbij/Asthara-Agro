const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const VendorsItem = require('../../models/vendorsItem/vendors_item');
//Define Route to create the item
router.post('/vendors_create_item', (req, res)=>{
    var newItem = new VendorsItem({
        userId: req.body.userId,
        category: req.body.category,
        grade: req.body.grade,
        unit: req.body.unit,
        added_by: req.body.added_by,
        image: req.body.image,
        item_name: req.body.item_name,
        category_name: req.body.category_name,
        grade_name: req.body.grade_name,
        unit_name: req.body.unit_name,
        min_quantity: req.body.min_quantity,
        full_name:req.body.full_name,
        description: req.body.description,
        item_quantity:req.body.item_quantity,
        item_price:req.body.item_price,
        address: req.body.address,
        landmark: req.body.landmark,
        district: req.body.district,
        state: req.body.state,
        country: req.body.country,
        postal_code: req.body.postal_code,
        nick_name:req.body.nick_name,
        buyer_approval_status: req.body.buyer_approval_status,
        vendor_pool: req.body.vendor_pool,
        manager_pool: req.body.manager_pool,
    })
    newItem.save()
    .then(item => {
        var message={message:"sucessfully added!",item:item};
        res.json(message);
    })
    .catch(err =>{
        var message={message:"something went wrong!",error:err};
        res.json(message);
    }) 
});

module.exports = router;