const express = require('express');
const router = express.Router();
const Sn = require('../../models/serialnumber/serialnumber');

router.put('/update_sn/:id',(req, res) =>{
    var sn_update = {
        sn:req.body.sn,
    }
    Sn.findOneAndUpdate({'_id':req.params.id}, sn_update)
    .then((sn) => {
        if(sn){
            var message = {message: "Serial Number sucessfully updated" };
            res.json(message);
        }else{
            var message = { messageerror: "Record not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;