const express = require('express');
const router = express.Router();
const UserCategory = require('../../models/userCategory/user_category');

router.put('/enabled_user_category/:id',(req, res) =>{
    var category_enabled = {
        status: req.body.status,
    }
    UserCategory.findOneAndUpdate({'_id':req.params.id}, category_enabled)
    .then((category) => {
        if(category){
            var message = { message: "user category sucessfully enabled!" };
            res.json(message);
        }else{
            var message = { message: "user category not found!" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something went wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;