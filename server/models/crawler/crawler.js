const mongoose = require('mongoose');
const _ = require('underscore');

let crawler_Schema = new mongoose.Schema({
    item_name:{
        type:String,
    },
    postal_code: [{
        type: String,
    }],
    price:{
        type:Number,
    }
    }, 
    {
    timestamps: true
});

const Crawler_Schema = mongoose.model('Crawler', crawler_Schema);
module.exports = Crawler_Schema;