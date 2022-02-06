const mongoose = require('mongoose');
const _ = require('underscore');

let manager_poolSchema = new mongoose.Schema({
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
manager_poolSchema.pre('save', function (next) {
    this.postal_code = _.uniq(this.postal_code);
    next();
});
const manager_pool = mongoose.model('manager_pool', manager_poolSchema);
module.exports = manager_pool;