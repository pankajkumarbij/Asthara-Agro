const mongoose = require('mongoose');
require('@mongoosejs/double');
const dispatch_for_delivery_Schema = new mongoose.Schema({
    salesId:{
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
    orders_items: {
        type: mongoose.Schema.Types.Mixed,
    },
    charge:{
        type:String,
    }
    }, {
    timestamps: true
});
const Dispatch_for_delivery = mongoose.model('Dispatch_for_delivery', dispatch_for_delivery_Schema);
module.exports = Dispatch_for_delivery;