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
    pincode:{
        type: String,
    },
    fpo:{
        type: String,
    },
    contact_number:{
        type: String,
    },
    total_land_in_acres:{
        type: String,
    },
    soil_type:{
        type: String,
    },
    aadhar_number:{
        type: String,
    },
    pan_number:{
        type: String,
    },
    image:{
        type: String,
    },
    krishi_number:{
        type: String,
    },
    krishi_upload:{
        type: String,
    },
    soil_upload:{
        type: String,
    },
    members:{
        type: String,
    },
    adults:{
        type: String,
    },
    childs:{
        type: String,
    },
    family_info:{
        type: mongoose.Schema.Types.Mixed,
    },
    loan_info:{
        type: mongoose.Schema.Types.Mixed,
    },
    crop_info:{
        type: mongoose.Schema.Types.Mixed,
    },
    land_info:{
        type: mongoose.Schema.Types.Mixed,
    },
    equipmentAndMachinery:{
        type: mongoose.Schema.Types.Mixed,
    },
    rain_fed:{
        type: String,
    },
    canal: {
        type: String,
    },
    borewell:{
        type: String,
    },
    apmc:{
        type: String,
    },
    private_mandi:{
        type: String,
    },
    contract_forming:{
        type: String,
    },
    declaration:{
        type: String,
    },
    }, {
    timestamps: true
});

const Fdc = mongoose.model('Fdc', fdcSchema);
module.exports = Fdc;
