const Double = require('@mongoosejs/double/lib');
const mongoose = require('mongoose');

const vendorsItemSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemCategory',
    },
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemGrade',
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemUnit',
    },
    image: {
        type: String
    },
    item_name: {
        type: String,
        required: true,
    },
    category_name: {
        type: String,
        required: true,
    },
    grade_name: { 
        type: String,
        required: true,
    },
    unit_name:{
        type:String,
    },
    item_quantity:{
        type:String,
    },
    description: {
        type: String,
        default:"",
    },
    item_price: {
        type: Double,
    },
    nick_name: {
        type: String
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
    min_quantity:{ 
        type:Number,
    },
    status:{
        type:String,
        default:"enabled"
    },
    buyer_approval_status:{
        type:String,
        default:"pending",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    vendor_pool: {
        type: String,
    },
    manager_pool: {
        type: String,
    },
    buyer_id: {
        type: String,
    },
    buyer_email: {
        type: String,
    },
    }, {
    timestamps: true
});
const vendorsItem = mongoose.model('vendorsItem', vendorsItemSchema);
module.exports = vendorsItem;