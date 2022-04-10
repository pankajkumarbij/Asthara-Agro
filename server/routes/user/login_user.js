const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../../models/user/user');

router.post('/login_user', (req, res)=>{
    User.findOne({ email: req.body.email}, function(err, user){
        if(err){
            res.json(err);
        }
        else if(!user){
            var message = { message: "user not found with this email"}
            res.json(message);

        }
        else {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(result){
                    var token = jwt.sign({ email: user.email ,userId:user._id,role:user.role,nick_name:user.nick_name,expiresIn:300}, 'asthara-agro');
                    //console.log(token);
                    var output = { 
                        token:token, 
                        email:user.email, 
                        user_id:user._id, 
                        role:user.role, 
                        nick_name:user.nick_name,
                        message: "successfully login"
                    }
                    res.json(output);
                }
                else{
                    var message = { message: "email and password do not match"}
                    res.json(message);
                }
            })
        }
    });
});

module.exports = router;