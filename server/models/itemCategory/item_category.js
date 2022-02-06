const mongoose = require('mongoose');

const itemCategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
    },
    status:{
        type:String,
        default:"enabled"
    }
    }, {
    timestamps: true
});

const ItemCategory = mongoose.model('ItemCategory', itemCategorySchema);
module.exports = ItemCategory;