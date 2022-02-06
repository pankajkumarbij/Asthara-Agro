const mongoose = require('mongoose');
require('@mongoosejs/double');
const pickupAssignConfirmSchema = new mongoose.Schema({
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
    buyer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    pickupAssignId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PickupAssign'
    },
    items:{
        type:mongoose.Schema.Types.Mixed,
    },
    pickup_assign_confirm_date:{
        type:Date,
        default: Date.now,
    },
    pickup_assign_confirm_date:{
        type:Date,
    },
    status: {
        type: String,
        default:"pending for vendor acceptance",
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

const PickupAssignConfirm = mongoose.model('PickupAssignConfirm', pickupAssignConfirmSchema);
module.exports = PickupAssignConfirm;
