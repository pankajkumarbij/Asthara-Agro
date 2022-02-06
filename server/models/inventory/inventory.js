const mongoose = require('mongoose');
require('@mongoosejs/double');
const inventorySchema = new mongoose.Schema({
    
    inventory_type:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InventoryCategory',
    },
    items:{
        type:mongoose.Schema.Types.Mixed,
        ref:'items'
    },
    purchase_order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PurchaseOrder',
    },
    purchase_order_confirm_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PurchaseOrderConfirm',
    },
    emp_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    indent_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Indent',
    },
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    vendor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    buyer_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    pickupAssignId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PickupAssignConfirm',
    },
    remark: {
        type: String,
        default:"",
    },
    status: {
        type: String,
        default:"",
    }
    }, {
    timestamps: true
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;