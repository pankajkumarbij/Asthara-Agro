const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userCategory',
    },
    role: {
        type: String,
        //required: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    nick_name: {
        type: String,
        required: true,
        unique: true,
    },
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    mobile_no: {
        type: Number,
        required: true,
    },
    idType: {
        type: String,
        required: true,
    },
    idNumber: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    gst_no: {
        type: String,
    },
    pool_name: {
        type: String
    },
    pool_id: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    status:{
        type:String,
        default:"enabled"
    }
    }, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;