const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const crawler = require('../../models/crawler/crawler');
//Define route for create crawler
router.post('/create_crawler', (req, res) => {
    crawler.init()
        .then( async ()=>{
            var new_creawler = new crawler({
                item_name : req.body.item_name,
                postal_code: req.body.postal_code,
                price: req.body.price,
            })
          const result = await new_creawler.save();
          var message={message:" crawler added succesfully!",data:result}
          res.json(message);

        })
        .catch((err) => {
            var message={message:"something wrong!",error:err}
            res.json(message);
        });
})

module.exports = router;