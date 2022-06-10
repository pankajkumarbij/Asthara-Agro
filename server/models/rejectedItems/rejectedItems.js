const mongoose = require('mongoose');
require('@mongoosejs/double');
const rejected_items_Schema = new mongoose.Schema({
    order_id: {
        type: String,
    },
    custom_orderId:{
        type: String,
    },
    item_name:{
        type: String,
    },
    unit:{
        type: String,
    },
    quantity:{
        type: String,
    },
    final_price:{
        type: String,
    },
    negotiate_price:{
        type: String,
    },
    }, {
    timestamps: true
});
const Rejected_items = mongoose.model('Rejected_items', rejected_items_Schema);
module.exports = Rejected_items;