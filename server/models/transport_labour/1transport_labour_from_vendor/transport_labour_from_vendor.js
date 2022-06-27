const mongoose = require('mongoose');
require('@mongoosejs/double');
const transport_from_vendorSchema = new mongoose.Schema({
    buyerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    vehicle_type:{
        type:String,
    },
    vehicle_number:{
        type:String,
    },
    driver_name:{
        type:String,
    },
    driver_mobile_no: {
        type: String,
    },
    labour_name:{
        type:String,
    },
    labour_mobile_no: {
        type: String,
    },
    charge:{
        type:Number,
    },
    date: {
        type: Object,
        
    },
    },
    {
        timestamps:true
    },
    { 
        "strict": false 
    });

transport_from_vendorSchema.index({ BuyerId: 1, date: 1}, { unique: true });
const Transport_from_vendor = mongoose.model('Transport_from_vendor', transport_from_vendorSchema);
module.exports = Transport_from_vendor;