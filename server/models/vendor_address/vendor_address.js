const mongoose = require('mongoose');

const vendoraddressSchema = new mongoose.Schema({
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
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
    }
    }, {
    timestamps: true
});
const Vendor_Address = mongoose.model('Vendor_Address', vendoraddressSchema);
module.exports = Vendor_Address;