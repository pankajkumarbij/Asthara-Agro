const mongoose = require('mongoose');
require('@mongoosejs/double');
const indentSchema = new mongoose.Schema({

    requestedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    items:{
        type:mongoose.Schema.Types.Mixed,
    },
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    vendor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
    },
    indent_created_date:{
        type:Date,
        default: Date.now,
    },
    indent_approval_date:{
        type:Date,
    },
    status:{
        type:String,
        default:"pending",
    },
    remark:{
        type:String,
        default:"",
    },
    margin:{
        type:String,

    },
    }, {
    timestamps: true
});
const Indent = mongoose.model('indents', indentSchema);
module.exports = Indent;
