const mongoose = require('mongoose');
require('@mongoosejs/double');
const orderSchema = new mongoose.Schema({
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    }, 
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    item_description:[{
        itemId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
        },
        quantity:{
            type:Number,
            default:0,
        },
        griding:{
            type:String,
        },
        unit_of_measurement:{
            type:String,
        },
        price:{
            type: mongoose.Schema.Types.Double,
            required:true,
        },
    }],
    inventory_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Inventory'
    },
    address_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address'
    },
    status: {
        type: String,
        default:"pending",
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;