const express = require('express');
const router = express.Router();
const User = require('../../models/user/user');

router.put('/enabled_user/:id',(req, res) =>{
    var user_update = {
        status: req.body.status,
    }
    User.findOneAndUpdate({'_id':req.params.id}, user_update)
    .then((user) => {
        if(user){
            var message = { message: "user sucessfully enabled" };
            res.json(message);
        }else{
            var message = { message: "user not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});

module.exports = router;