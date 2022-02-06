const mongoose = require('mongoose');
require('@mongoosejs/double');
const grnSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createddBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    purchaseOrder:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'purchaseOrder',
    },
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'order',
    },
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    indentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'indent',
    },
    paymentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'payment',
    },
    invoiceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'invoice',
    },
    items: {
        type: mongoose.Schema.Types.Mixed,
    },
      status: {
        type: String,
        default:"pending",
    },
      remark: {
        type: String,
        default:"",
    },
    date_of_issue:{
        type:Date,
        default: Date.now,
    },
    }, {
    timestamps: true
});
const Grn = mongoose.model('Grn', grnSchema);
module.exports = Grn;
