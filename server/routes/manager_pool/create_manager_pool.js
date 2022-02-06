const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const manager_pool = require('../../models/manager_pool/manager_pool');
//Define route for create manager_pool
router.post('/create_manager_pool', (req, res) => {
    manager_pool.init()
        .then( async ()=>{
            var newmanager_pool = new manager_pool({
                pool_name : req.body.pool_name,
                postal_code: req.body.postal_code,
            })
          const result = await newmanager_pool.save();
          var message={message:" manager_pool added succesfully!",manager_pool:result}
          res.json(message);

        })
        .catch((err) => {
            var message={message:"something wrong!",error:err}
            res.json(message);
        });
})

module.exports = router;