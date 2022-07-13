const mongoose = require('mongoose');

const mandiInventorySchema = new mongoose.Schema({
    order:{
        type: mongoose.Schema.Types.Mixed,
    },
    }, {
    timestamps: true
});

const MandiInventory = mongoose.model('mandiInventorySchema', mandiInventorySchema);
module.exports = MandiInventory;