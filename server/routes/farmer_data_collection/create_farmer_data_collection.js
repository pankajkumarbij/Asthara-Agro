const express = require("express");
const router = express.Router();
/* Required Model for store in database*/
const Fdc=require('../../models/farmer_data_collection/farmer_data_collection')
//DEfine route to create Famer Data Collection
router.post('/create_fdc',(req,res)=>{
    var newFdc = new Fdc({
        name:req.body.name,
        father_name:req.body.father_name,
        village:req.body.village,
        pincode:req.body.pincode,
        fpo:req.body.fpo,
        contact_number:req.body.contact_number,
        total_land_in_acres:req.body.total_land_in_acres,
        soil_type:req.body.soil_type,
        aadhar_number:req.body.aadhar_number,
        pan_number:req.body.pan_number,
        krishi_number:req.body.krishi_number,
        members:req.body.members,
        adults:req.body.adults,
        childs:req.body.childs,
        image:req.body.image,
        soil_upload:req.body.soil_upload,
        krishi_upload:req.body.krishi_upload,
        family_info:req.body.family_info,
        loan_info:req.body.loan_info,
        crop_info:req.body.crop_info,
        land_info:req.body.land_info,
        equipmentAndMachinery:req.body.equipmentAndMachinery,
        rain_fed: req.body.rain_fed,
        canal: req.body.canal,
        borewell: req.body.borewell,
        private_mandi: req.body.private_mandi,
        contract_forming: req.body.contract_forming,
        declaration: req.body.declaration,
    })
    newFdc.save()
    .then(Fdc => {
        res.json({msg:"Successfully Saved",data:Fdc});
    })
    .catch(err => res.json({msg:"Somthing went wrong",err}))
});

module.exports = router;