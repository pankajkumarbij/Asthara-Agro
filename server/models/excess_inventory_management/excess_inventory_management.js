const mongoose = require('mongoose');

const excess_inventory_Schema = new mongoose.Schema({
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    buyerId:{
        type:mongoose.Schema.Types.ObjectId, 
        required:true,
        ref:'User'
    },
    items: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
    excess_quantity :{
        type : Number,
        default: 0,
    },
    wastage :{
        type: Number,
        default: 0,
    },
    reserved :{
        type :Number,
        default: 0,
    },
    status:{
        type :String,
        default:"Pending"
    }
    }, {
    timestamps: true
});
const Excess_inventory = mongoose.model('excess_inventory', excess_inventory_Schema);
module.exports = Excess_inventory;