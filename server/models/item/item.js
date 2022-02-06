const mongoose = require('mongoose');
const Double = require('@mongoosejs/double/lib');

const itemSchema = new mongoose.Schema({

    item_name: {
        type: String,
        unique: true,
        required: true,
    },
    status:{
        type:String,
        default:"enabled"
    }  
    }, {
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;