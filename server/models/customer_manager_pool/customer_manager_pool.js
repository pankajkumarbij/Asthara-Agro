const mongoose = require('mongoose');

const manager_customerSchema = new mongoose.Schema({
    customer_pool_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer_pool',
        required: true,
    },
    customer_pool_name: {
        type: String,
        required: true,
    },
    manager_pool_Id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Manager_pool',
        required: true,
    },
    manager_pool_name: {
        type: String,
        required: true,
    }
    }, {
    timestamps: true
});

const Manager_customer_cross = mongoose.model('Manager_customer_cross', manager_customerSchema);
module.exports = Manager_customer_cross;