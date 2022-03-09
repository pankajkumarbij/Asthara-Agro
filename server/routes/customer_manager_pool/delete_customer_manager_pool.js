const express = require('express');
const router = express.Router();
/* Required Model for store in database*/
const Manager_customer_cross = require('../../models/customer_manager_pool/customer_manager_pool');
//Define route for create customer_pool
router.get('/delete_manager_customer_cross_pool/:id',(req, res) =>{ 
    Manager_customer_cross.findOneAndRemove({'_id':req.params.id})
    .then((cross_pool) => {
        if(cross_pool){
            var message = { message: "manager customer cross pool sucessfully deleted" };
            res.json(message);
        }else{
            var message = { message: "manager customer cross pool not found" };
            res.json(message);
        }
    }).catch(err => {
        console.log(err);
        var message = { message:"Something went wrong!",success: false, err: err };
        res.json(message);
    })
});

module.exports = router;