const mongoose = require('mongoose');
require('@mongoosejs/double');
const delivered_Schema = new mongoose.Schema({
    order:{
        type:mongoose.Schema.Types.Mixed,
    },
    status:{
        type: String,
        default: "pending for delivery",
    },
    accepted_items:{
        type:mongoose.Schema.Types.Mixed,
    },
    }, {
    timestamps: true
});
const Delivered = mongoose.model('Delivered', delivered_Schema);
module.exports = Delivered;