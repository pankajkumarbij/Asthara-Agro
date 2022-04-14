const mongoose = require('mongoose');
require('@mongoosejs/double');
const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    nick_name:{
        type:String,
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
        default: "",
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
        required: true,
    },
    customerSystemOrderId: {
        type: String,
    },
    expectedDeliveryTime: {
        type: String,
    },
    expectedDeliveryDate: {
        type: String,
    },
    items: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    incentive: {
        type: String,
    },
    status:{
        type:String,
        default:"pending",
    },
    completion_status:{
        type:String,
        default:"new",
    },
    customerPoolId: {
        type: String,
    },
    vendorPoolId: {
        type: String,
    },
    order_date:{
        type:Date,
        default: Date.now,
    },
    order_date2:{
        type:Date,
    },
    }, {
    timestamps: true
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;