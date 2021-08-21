const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const UpdateInventory = require('../../models/inventory/inventory');
//DEfine the Route to update inventory
router.post('/update_inventory', (req, res)=>{
    var newInventory = new UpdateInventory({
        
        inventory_type: req.body.inventory_type,
        griding: req.body.griding,
        item_id: req.body.item_id,
        purchase_order_id: req.body.purchase_order_id,
        emp_id: req.body.emp_id,
        indent_id: req.body.indent_id,
        vendor_id: req.body.vendor_id,
        remark: req.body.remark,
        status: req.body.status,
    })
    newInventory.save()
    .then(inventory => {
        res.json(inventory);
    })
    .catch(err => res.json(err));
});

module.exports = router;

