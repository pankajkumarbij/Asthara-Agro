const mongoose = require('mongoose');

const snSchema = new mongoose.Schema({
    sn: {
        type: Number,
    },
});

const Sn = mongoose.model('Sn', snSchema);
module.exports = Sn;