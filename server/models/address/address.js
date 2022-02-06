const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId:{
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

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;