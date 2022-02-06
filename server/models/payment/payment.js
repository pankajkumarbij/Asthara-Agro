const mongoose = require('mongoose');
require('@mongoosejs/double');
const paymentSchema = new mongoose.Schema({
    
    payment_created_date:{
        type:Date,
        default: Date.now,
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    vendor_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    emp_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    grn:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'GRN'
    },
    inventory_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Inventory'
    },
    address_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address'
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
        amount:{
            type:mongoose.Schema.Types.Double,
            require:true,
        },
    }],
    total_payment:{
        type:mongoose.Schema.Types.Double,
        required:true
    },
    payable_date:{
        type:Date,
        default: Date.now , // +7 for after 7day's date
    },
    status: {
        type: String,
        default:"pending"
    },
    remark:{
        type: String,
        default:""
    }
},
{
    timestamps: true
}
);

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;





