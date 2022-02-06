const mongoose = require('mongoose');
require('@mongoosejs/double');
const delivery_assignmentSchema = new mongoose.Schema({
    delivery_assign_date:{
        type:Date,
        default: Date.now,
    },
    order_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PuchaseOrder'
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }, 

    vendor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    invoice_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Invoice'
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
        unit_of_measurement:{
            type:String,
        },
        price:{
            type: mongoose.Schema.Types.Double,
            required:true,
        },
    }],
    address_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address'
    },
    address_location:{
        type:String,
    },
    status: {
        type: String,
        default:"pending",
    },
},{
    timestamps: true
}
);

const Delivery_assignment = mongoose.model('Delivery_assignment', delivery_assignmentSchema);
module.exports = Delivery_assignment;
