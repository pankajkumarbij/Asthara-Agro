const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Address = require('../../models/address/address');
//Define route to delete the address by Id
router.get('/delete_address/:id',(req, res) =>{ 
    Address.findOneAndRemove({'_id':req.params.id})
    .then((address) => {
        if(address){
            var message = { message: "address sucessfully deleted" };
            res.json(message);
        }else{
            var message = { message: "address not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something went wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;