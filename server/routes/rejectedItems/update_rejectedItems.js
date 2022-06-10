const express = require('express');
const router = express.Router();
const RejectedItems = require('../../models/rejectedItems/rejectedItems');

router.put('/update_delivered/:id',(req, res) =>{
    var update = {
        
    }
    RejectedItems.findOneAndUpdate({'_id':req.params.id},update)
    .then((item) => {
        if(item){
            res.json({ message: "updated Sucessfully" });
        }else{
            res.json({ message: "item not found" });
        }
    }).catch(err => {
        console.log(err);
        res.json({message:"Something went wrong!", success: false, err: err });
    })
});

module.exports = router;