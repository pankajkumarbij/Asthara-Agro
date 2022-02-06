const express = require('express');
const router = express.Router();
const User = require('../../models/user/user');

router.get('/delete_user/:id',(req, res) =>{ 
    User.findOneAndRemove({'_id':req.params.id})
    .then((user) => {
        if(user){
            var message = { success: "User sucessfully deleted" };
            res.json(message);
        }else{
            var message = { error: "User not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});

module.exports = router;