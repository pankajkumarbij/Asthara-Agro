const mongoose = require('mongoose');

const scrapInventorySchema = new mongoose.Schema({
    order:{
        type: mongoose.Schema.Types.Mixed,
    },
    }, {
    timestamps: true
});

const ScrapInventory = mongoose.model('scrapInventorySchema', scrapInventorySchema);
module.exports = ScrapInventory;