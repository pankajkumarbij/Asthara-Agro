const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const crawler = require('../../models/crawler/crawler');
//Define route for create customer_pool
router.put('/update_crawler/:id', (req, res)=>{
    var crawler = {
        item_name: req.body.item_name,
        postal_code: req.body.postal_code,
        price:req.body.price,
    }
   crawler.findOneAndUpdate({'_id':req.params.id},crawler)
    .then((crawler) => {
        if(crawler){
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