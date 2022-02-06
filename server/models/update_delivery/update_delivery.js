const mongoose = require('mongoose');
require('@mongoosejs/double');
const updateDeliverySchema = new mongoose.Schema({
    
    requestedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    },
    purchaseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Purchase'
    },
    indent_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Indent'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    vendor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    sales_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    order_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    },
    items:{
        type:mongoose.Schema.Types.Mixed,
    },
    name:{
        type:String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
    },
    district: { 
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: Object,
        required: true,
    },
    postal_code: {
        type: Number,
        required: true,
    },
    mobile_no: {
        type: String,
    },
    status: {
        type: String,
        default:"waiting for customer end",
    },
    delivery_date:{
        type:Date,
        default: Date.now,
    },
    }, {
    timestamps: true
});
const updateDelivery = mongoose.model('updateDelivery', updateDeliverySchema);
module.exports = updateDelivery;
