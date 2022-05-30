const express = require('express');
const router = express.Router();

const Fdc=require('../../models/farmer_data_collection/farmer_data_collection');

router.put('/update_fdc_crop_info/:id', (req, res)=>{
    var fdc = {
        crop_info:req.body.Items
    }
    Fdc.findOneAndUpdate({'_id':req.params.id},fdc)
    .then((fdc) => {
        if(fdc){
            res.json({data:fdc, msg: "successfully saved"});
        }else{
            res.json({msg: "not found"});
        }
    }).catch(err => {
        console.log(err);
        res.json({ msg:"Something wrong!", err: err });
    })
});

router.put('/update_fdc_land_info/:id', (req, res)=>{
    var fdc = {
        land_info:req.body.Item
    }
    Fdc.findOneAndUpdate({'_id':req.params.id},fdc)
    .then((fdc) => {
        if(fdc){
            res.json({data:fdc, msg: "successfully saved"});
        }else{
            res.json({msg: "not found"});
        }
    }).catch(err => {
        console.log(err);
        res.json({ msg:"Something wrong!", err: err });
    })
});

router.put('/update_fdc_em_info/:id', (req, res)=>{
    var fdc = {
        equipmentAndMachinery:req.body.Item
    }
    Fdc.findOneAndUpdate({'_id':req.params.id},fdc)
    .then((fdc) => {
        if(fdc){
            res.json({data:fdc, msg: "successfully saved"});
        }else{
            res.json({msg: "not found"});
        }
    }).catch(err => {
        console.log(err);
        res.json({ msg:"Something wrong!", err: err });
    })
});

router.put('/update_fdc_checks/:id', (req, res)=>{
    var fdc = {
        rain_fed: req.body.rain_fed,
        canal: req.body.canal,
        borewell: req.body.borewell,
        apmc: req.body.apmc,
        private_mandi: req.body.private_mandi,
        contract_formin: req.body.contract_formin,
        bank: req.body.bank,
        private: req.body.private,
        declaration: req.body.declaration,
    }
    Fdc.findOneAndUpdate({'_id':req.params.id},fdc)
    .then((fdc) => {
        if(fdc){
            res.json({data:fdc, msg: "successfully saved"});
        }else{
            res.json({msg: "not found"});
        }
    }).catch(err => {
        console.log(err);
        res.json({ msg:"Something wrong!", err: err });
    })
});

module.exports = router;