const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Transport= require('../../../models/transport_labour/transport_labour_from_vendor/transport_labour_from_vendor');

//Define Route to create order 
router.get('/delete_transport_labour_from_vendor/:id',(req, res) =>{ 
    Transport.findOneAndRemove({'_id':req.params.id})
    .then((transport) => {
        if(transport){
            var message = { message: "transport sucessfully deleted" };
            res.json(message);
        }else{
            var message = { message: "transport not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message: false, err: err };
        res.json(message);
    })
});

module.exports = router;