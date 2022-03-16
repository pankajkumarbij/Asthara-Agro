const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const crawler = require('../../models/crawler/crawler');
//Define route for create customer_pool
router.get('/retrieve_crawlers',(req, res)=>{
    crawler.find({}, function(err, customer_pool){
        if(err){
            console.log(err);
        }
        else {
            res.json(customer_pool);
        }
    });
});
module.exports = router;