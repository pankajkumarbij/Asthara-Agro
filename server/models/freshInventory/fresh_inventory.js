const mongoose = require('mongoose');

const freshInventorySchema = new mongoose.Schema({
    order_id:{
        type: String,
    },
    custom_orderId:{
        type: String,
    },
    custom_vendorId:{
        type: String,
    },
    item_name:{
        type: String,
    },
    grade:{
        type: String,
    },
    unit:{
        type: String,
    },
    quantity:{
        type: String,
    },
    price:{
        type: String,
    },
    order:{
        type: mongoose.Schema.Types.Mixed,
    },
    status:{
        type: String,
        default: 'Original Inventory',
    },
    }, {
    timestamps: true
});

const FreshInventory = mongoose.model('freshInventorySchema', freshInventorySchema);
module.exports = FreshInventory;