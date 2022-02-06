const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const manager_pool = require('../../models/manager_pool/manager_pool');
//Define route for create manager_pool
router.get('/delete_manager_pool/:id',(req, res) =>{ 
   manager_pool.findOneAndRemove({'_id':req.params.id})
    .then((manager_pool) => {
        if(manager_pool){
            var message = { message: "manager_pool sucessfully deleted" };
            res.json(message);
        }else{
            var message = { message: "manager_pool not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something went wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;