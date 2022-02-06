const mongoose = require('mongoose');

const itemUnitSchema = new mongoose.Schema({
    unit_name: {
        type: String,
    },
     status:{
        type:String,
        default:"enabled"
    }
    }, {
    timestamps: true
});

const ItemUnit = mongoose.model('ItemUnit', itemUnitSchema);
module.exports = ItemUnit;