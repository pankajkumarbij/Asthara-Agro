const express = require('express');
const router = express.Router();
const Sn = require('../../models/serialnumber/serialnumber');

router.post('/create_sn', (req, res)=>{
    var newSn = new Sn({
        sn: req.body.sn,
    })
    newSn.save()
    .then(post => {
        var message={message:"successfully Serial Number Created"};
        res.json(message);
    })
    .catch(err => res.json(err));
});

module.exports = router;