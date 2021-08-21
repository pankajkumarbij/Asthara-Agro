const express = require("express");
const router = express.Router();
/* Required Model for store in database*/
const Indent=require('../../models/indent/indent')
//Dfine route to diplay the indents
router.get('/displayindent',(req, res)=>{
        Indent.find({}, function(err, indents){
        if(err){
            console.log(err);
        }
        else {
            res.json(indents);
        }
    });
});
//DEfien route to display all indent by indent_id
router.get('/displayindent/:id',(req, res)=>{
        Indent.find({'_id':req.params.id}, function(err, indents){
        if(err){
            console.log(err);
        }
        else {
            res.json(indents);
        }
    });
});

module.exports = router;
