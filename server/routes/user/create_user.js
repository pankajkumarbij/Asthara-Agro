const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/user/user');

router.post('/create_user', async (req, res)=>{
    if(req.body.password==req.body.confirm_password){
        bcrypt.hash(req.body.password, 12, function(err, hash){
            const category=req.body.category;
            const role=req.body.role;
            const full_name= req.body.full_name;
            const nick_name= req.body.nick_name;
            const email= req.body.email;
            const mobile_no= req.body.mobile_no;
            const idType= req.body.idType;
            const idNumber= req.body.idNumber;
            const image= req.body.image;
            const gst_no= req.body.gst_no;
            const pool_name= req.body.pool_name;
            const pool_id= req.body.pool_id;
            const password= hash;
            var newUser = new User({category,role,full_name,nick_name,email,mobile_no,idNumber,idType,image,gst_no,pool_name,pool_id,password})
            newUser.save()
            .then(user => {
                var message={message:"successfully added!",data:user};
                res.json(message);
            })
            .catch(err => {
                var message = {message:"All field required!",error:err};
                if( err.code=="11000" && Object.keys(err.keyValue)[0] == "nick_name"){
                   message.message="username already exist!";
                }
                else if(err.code=="11000" && Object.keys(err.keyValue)[0]  == "email"){
                   message.message="email already exist!";
                }
                res.json(message);
            })
        });
    }
    else{
        var message = { message:"password and confirm password not equal" };
        res.json(message);
    }
});

module.exports = router;