const mongoose = require('mongoose');
require('@mongoosejs/double');
const orderSummarySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
    },
    sales_id:{
        type: String,
    },
    custom_orderId:{
        type:String,
    },
    item: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    status:{
        type:String,
        default:"Full Order",
    },
    customerPoolId: {
        type: String,
    },
    vendorPoolId: {
        type: String,
    },
    managerPoolId: {
        type: String,
    },
    vendor_rejected: [],
    date:{
        type:Date,
        default: Date.now,
    },
    }, {
    timestamps: true
});

const OrderSummary = mongoose.model('OrderSummary', orderSummarySchema);
module.exports = OrderSummary;