const mongoose = require('mongoose');
require('@mongoosejs/double');
const purchaseorderConfirmSchema = new mongoose.Schema({
    order_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderSummary'
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    },
    custom_orderId:{
        type:String,
    },
    custom_vendorId:{
        type:String,
    },
    purchaseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Purchase'
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    vendor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    items:{
        type:mongoose.Schema.Types.Mixed,
    },
    purchase_order_created_date:{
        type:Date,
        default: Date.now,
    },
    purchase_order_approval_date:{
        type:Date,
    },
    status: {
        type: String,
        default:"pending for manager acceptance",
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
    }, {
    timestamps: true
});

const PurchaseOrderConfirm = mongoose.model('PurchaseOrderConfirm', purchaseorderConfirmSchema);
module.exports = PurchaseOrderConfirm;
