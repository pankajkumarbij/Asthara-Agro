const mongoose = require('mongoose');

const recieved_from_buyer = new mongoose.Schema({
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

const Recieved_from_buyer = mongoose.model('recieved_from_buyer', recieved_from_buyer);
module.exports = Recieved_from_buyer;