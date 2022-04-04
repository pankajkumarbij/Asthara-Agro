const express = require('express');
const router = express.Router();
// Required Model for store in database
const crawler = require('../../models/crawler/crawler');
//Define route for create customer_pool
router.put('/update_crawler/:id', (req, res)=>{
    var cr = {
        item_name : req.body.item_name,
        item_grade : req.body.item_grade,
        item_quantity : req.body.item_quantity,
        date : req.body.date,
        postal_code : req.body.postal_code,
        price: req.body.price,
    }
    crawler.findOneAndUpdate({'_id':req.params.id},cr)
    .then((cr) => {
        if(cr){
            var message = { message: "crawler sucessfully updated!" };
            res.json(message);
        }else{
            var message = { message: "crawler not found!" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;