const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    bank_name: { 
        type: String,
        required: true,
    },
    branch_name: {
        type: String,
        required: true,
    },
    account_number: {
        type: Number,
        required: true,
    },
    account_holder_name: {
        type: String,
        required: true,
    },
    ifsc_code: { 
        type: String,
        required: true,
    },
    account_type:{
        type:String,
        required: true,
    }
    }, {
    timestamps: true
});
const Bank = mongoose.model('Bank', bankSchema);
module.exports = Bank;