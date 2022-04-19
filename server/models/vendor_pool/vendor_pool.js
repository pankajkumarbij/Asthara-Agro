const mongoose = require('mongoose');
const _ = require('underscore');

let vendor_poolSchema = new mongoose.Schema({
    pool_name:{
        type:String,
        required:true,
        unique: true,
        index: true,
    },
    postal_code: [{
        type: String,
        required: true,
        unique: true,
    }],
    // flag_value:{
    //     type:Number,
    //     default:0,
    // }
    }, 
    {
    timestamps: true
});
vendor_poolSchema.pre('save', function (next) {
    this.postal_code = _.uniq(this.postal_code);
    next();
});
const vendor_pool = mongoose.model('Vendor_pool', vendor_poolSchema);
module.exports = vendor_pool;