const mongoose = require('mongoose');

const recieved_from_vendor = new mongoose.Schema({
    purchase_order:{
        type: mongoose.Schema.Types.Mixed,
    },
    flag:{
        type: Number,
        default: 0,
    },
    vehicle_number:{
        type: String,
    },
    driver_name:{
        type: String,
    },
    driver_mobile_no:{
        type: String,
    },
    labour_name:{
        type: String,
    },
    labour_mobile_no:{
        type: String,
    },
    barcode:{
        type: String,
    },
    }, {
    timestamps: true
});

const Recieved_from_vendor = mongoose.model('recieved_from_vendor', recieved_from_vendor);
module.exports = Recieved_from_vendor;