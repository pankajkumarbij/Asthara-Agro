const mongoose = require('mongoose');
require('@mongoosejs/double');
const orderstatusSchema = new mongoose.Schema({
    orderId:{
        type:String,
    },
    item_name:{
        type:String
    },
    item_grade:{
        type:String,
    },
    quantity:{
        type:String,
    },
    status:{
        type:String,
    },
    split_status:{
        type:String,
    },
    }, {
    timestamps: true
});
const Order_Status = mongoose.model('Order_status', orderstatusSchema);
module.exports = Order_Status;