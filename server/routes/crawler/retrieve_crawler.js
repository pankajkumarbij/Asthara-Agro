const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const crawler = require('../../models/crawler/crawler');
//Define route for retrieve crawler
router.get('/retrieve_crawlers',(req, res)=>{
    crawler.find({}, function(err, crawler){
        if(err){
            console.log(err);
        }
        else {
            res.json(crawler);
        }
    });
});

router.get('/retrieve_crawler_by_item_name/:item_name',(req, res)=>{
    crawler.find({item_name:req.params.item_name}, function(err, crawler){
        if(err){
            console.log(err);
        }
        else {
            res.json(crawler);
        }
    });
});
module.exports = router;