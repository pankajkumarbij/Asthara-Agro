const express = require('express');
const router = express.Router();
const Purchase_order = require('../../../models/report/completed_purchase_order/completed_purchase_order');

router.post('/create_completed_purchase_order', (req, res)=>{
    var newPurchase = new Purchase_order({
        purchase_order:req.body.purchase_order,
    })
    newPurchase.save()
    .then(post => {
        var message={message:"successfully added",purchase_details:post};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;