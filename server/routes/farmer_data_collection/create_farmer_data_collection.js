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
        fpo:req.body.fpo,
        contact_number:req.body.contact_number,
        date:req.body.date,
        total_land_in_acres:req.body.total_land_in_acres,
        soil_type:req.body.soil_type,
        crop_info:req.body.crop_info,
        land_info:req.body.land_info,
        equipmentAndMachinery:req.body.equipmentAndMachinery,
        rain_fed: req.body.rain_fed,
        canal: req.body.canal,
        borewell: req.body.borewell,
        private_mandi: req.body.private_mandi,
        contract_forming: req.body.contract_forming,
        bank: req.body.bank,
        private: req.body.private,
        declaration: req.body.declaration,
    })
    newFdc.save()
    .then(Fdc => {
        res.json({msg:"Successfully Saved",data:Fdc});
    })
    .catch(err => res.json({msg:"Somthing went wrong",err}))
});

module.exports = router;