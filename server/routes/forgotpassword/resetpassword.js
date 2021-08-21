const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const User = require('../../models/user/user');
const bcrypt = require('bcrypt');

//DEfien route to reset password
router.put('/reset_password/',(req, res) =>{
    bcrypt.hash(req.body.password, 12, function(err, hash){
    var user_update = {
        password:hash
    };
    User.findOneAndUpdate({'email':req.body.email}, user_update)
    .then((user) => {
        if(user){
            var message = { message: "sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "email not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = {message:"Something went wrong!", success: false, err: err };
        res.json(message);
    })
});

});

module.exports = router;