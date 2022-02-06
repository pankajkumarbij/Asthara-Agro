const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const UpdateInventory = require('../../models/inventory/inventory');
//DEfine the Route to update inventory
router.post('/update_inventory', (req, res)=>{
    var newInventory = new UpdateInventory({

        // inventory_type: req.body.inventory_type,
        // griding: req.body.griding,
        items: req.body.items,
        vendor_id: req.body.vendor_id,
        remark: req.body.remark,
        status: req.body.status,

        // inventory_type: req.body.inventory_type,
        // griding: req.body.griding,
        purchase_order_id: req.body.purchase_order_id,
        purchase_order_confirm_id: req.body.purchase_order_confirm_id,
        emp_id: req.body.emp_id,
        indent_id: req.body.indent_id,
        order_id: req.body.order_id,
        buyer_id: req.body.buyer_id,
        pickupAssignId: req.body.pickupAssignId,
    })
    newInventory.save()
    .then(item => {
        var message={message:"sucessfully added!",item:item};
        res.json(message);
    })
    .catch(err =>{
        var message={message:"something went wrong!",error:err};
        res.json(message);
    }) 
    .catch(err => res.json(err));
});

module.exports = router;

