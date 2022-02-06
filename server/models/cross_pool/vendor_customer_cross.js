const mongoose = require('mongoose');

const vendor_customerSchema = new mongoose.Schema({
    customer_pool_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer_pool',
        required: true,
    },
    customer_pool_name: {
        type: String,
        required: true,
    },
    vendor_pool_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vendor_pool',
        required: true,
    },
    vendor_pool_name: {
        type: String,
        required: true,
    }
    }, {
    timestamps: true
});

const Vendor_customer_cross = mongoose.model('Customer_vendor_cross', vendor_customerSchema);
module.exports = Vendor_customer_cross;