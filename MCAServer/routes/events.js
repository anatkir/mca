const express = require('express');
var router = express.Router();

router.get('/events', (req,res) => {
   
    dbo.collection("events").find({}).toArray( function(err, result) {
        if (err) {
            res.status(500).send({error:err});
        }
        res.send(result);
      });
});


module.exports = router;