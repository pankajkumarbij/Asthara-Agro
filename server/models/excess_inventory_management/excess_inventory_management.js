const mongoose = require('mongoose');

const excess_inventory_Schema = new mongoose.Schema({
    VendorId:{
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
        type : String,
    },
    wastage :{
        type: String
    },
    reserved :{
        type :String,
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