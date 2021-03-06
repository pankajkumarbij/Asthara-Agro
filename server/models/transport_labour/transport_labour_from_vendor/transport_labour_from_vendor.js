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
    orders_items: {
        type: mongoose.Schema.Types.Mixed,
    },
    charge:{
        type:String,
    },
    img: {
        type:String,
    },
    img2: {
        type:String,
    },
    img3: {
        type:String,
    },
    img4: {
        type:String,
    },
    img5: {
        type:String,
    },
    img6: {
        type:String,
    },
    img7: {
        type:String,
    },
    img8: {
        type:String,
    },
    img9: {
        type:String,
    },
    img10: {
        type:String,
    },
    img11: {
        type:String,
    },
    img12: {
        type:String,
    }
    }, {
    timestamps: true
});
const Transport_from_vendor = mongoose.model('Transport_from_vendor', transport_from_vendorSchema);
module.exports = Transport_from_vendor;