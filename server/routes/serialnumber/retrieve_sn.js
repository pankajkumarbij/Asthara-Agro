const express = require('express');
const router = express.Router();
const Sn = require('../../models/serialnumber/serialnumber');

router.get('/retrieve_sn',(req, res)=>{
    Sn.find({}, function(err, sn){
        if(err){
            console.log(err);
        }
        else {
            res.json(sn);
        }
    });
});

module.exports = router;