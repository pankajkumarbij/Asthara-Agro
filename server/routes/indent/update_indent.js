const express = require("express");
const router = express.Router();
/* Required Model for store in database*/
const Indent=require('../../models/indent/indent')
//DEfine route to update indent by indent id
router.put('/updateindent/:id',(req, res) =>{ 
    var newupdate = {
        userId:req.params.userId,
        customerId:req.params.customerId,
        requestedBy:req.params.empId,
        remark:req.body.remark,
        items:req.body.items,
        margin:req.body.margin,
        status:req.body.status,
    }
    Indent.findOneAndUpdate({'_id':req.params.id},newupdate)
    .then((item) => {
        if(item){
            var message = {message: "Indent sucessfully updated" };
            res.json(message);
        }else{
            var message = { messageerror: "Record not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { success: false, err: err };
        res.json(message);
    })
});
//DEfine Route to update status of indent 
router.put('/update_indent_status/:id',(req, res) =>{
    var order_update = {
        status: req.body.status,
    }
    Indent.findOneAndUpdate({'_id':req.params.id}, order_update)
    .then((order) => {
        if(order){
            var message = { message: "Status sucessfully updated" };
            res.json(message);
        }else{
            var message = { message: "Indent not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"something went wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;