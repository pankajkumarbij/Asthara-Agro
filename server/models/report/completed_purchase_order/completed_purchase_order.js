const mongoose = require('mongoose');

const all_comp_purchase_order = new mongoose.Schema({
    purchase_order:{
        type: mongoose.Schema.Types.Mixed,
    },
    flag:{
        type: Number,
        default: 0,
    }
    }, {
    timestamps: true
});

const All_comp_purchase_order = mongoose.model('all_comp_purchase_order', all_comp_purchase_order);
module.exports = All_comp_purchase_order;