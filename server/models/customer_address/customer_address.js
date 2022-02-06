const mongoose = require('mongoose');

const customeraddressSchema = new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    customerEmail:{
        type: String,
        required: true,
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
    }, {
    timestamps: true
});

const Customer_Address = mongoose.model('Customer_Address', customeraddressSchema);
module.exports = Customer_Address;