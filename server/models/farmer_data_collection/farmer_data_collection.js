const mongoose = require('mongoose');

const fdcSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    father_name:{
        type: String,
    },
    village:{
        type: String,
    },
    fpo:{
        type: String,
    },
    contact_number:{
        type: String,
    },
    date:{
        type: String,
    },
    total_land_in_acres:{
        type: String,
    },
    soil_type:{
        type: String,
    },
    crop_info:{
        type: mongoose.Schema.Types.Mixed,
    },
    land_info:{
        type: mongoose.Schema.Types.Mixed,
    },
    equipmentAndMachinery:{
        type: mongoose.Schema.Types.Mixed,
    }
    }, {
    timestamps: true
});

const Fdc = mongoose.model('Fdc', fdcSchema);
module.exports = Fdc;
