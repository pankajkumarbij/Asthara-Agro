const mongoose = require('mongoose');
const _ = require('underscore');

let customer_poolSchema = new mongoose.Schema({
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
    flag_value:{
        type:Number,
        default:0,
    }
    }, 
    {
    timestamps: true
});
customer_poolSchema.pre('save', function (next) {
    this.postal_code = _.uniq(this.postal_code);
    next();
});
const customer_pool = mongoose.model('Customer_pool', customer_poolSchema);
module.exports = customer_pool;