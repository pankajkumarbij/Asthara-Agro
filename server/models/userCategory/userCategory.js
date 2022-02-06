const mongoose = require('mongoose');

const userCategorySchema = new mongoose.Schema({
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
const UserCategory = mongoose.model('UserCategory', userCategorySchema);
module.exports = UserCategory;