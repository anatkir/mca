const express = require('express');
var router = express.Router();

router.post('/addComment', (req,res) => {
   
    dbo.collection("events_comments").insertOne(req.body, function(err, result) {
        if (err) {
            res.status(500).send({error:err});
        }
        console.log(req.session);
        res.send({message:"Comment Created"});
      });
});


router.get('/getAllComments/:id', (req,res) => {
    dbo.collection("events_comments").find({eventId : req.params.id}).toArray(function(err,result){
        if (err) {
            res.status(500).send({error:err});
        } else res.send(result);
      });
});

module.exports = router;