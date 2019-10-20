//API for events_comments collection

const express = require('express');
const ObjectID = require('mongodb').ObjectID;
var router = express.Router();

//Add new comment in the db
router.post('/addComment', (req,res) => {
   
    dbo.collection("events_comments").insertOne(req.body, function(err, result) {
        if (err) {
            res.status(500).send({error:err});
        }
        console.log(req.session);
        res.send({message:"Comment Created"});
      });
});


//Getting all the comments from the db
router.get('/getAllComments/:id', (req,res) => {
    dbo.collection("events_comments").find({eventId : req.params.id}).toArray(function(err,result){
        if (err) {
            res.status(500).send({error:err});
        } else res.send(result);
      });
});

//Delete an event
router.delete('/deleteComment/:id', (req,res) => {
    console.log(req.params.id)
     dbo.collection("events_comments").deleteOne({_id:new ObjectID(req.params.id)}, function(err, result) {
         console.log(result);
         if (err) {
             res.status(500).send({error:err});
         }
         res.send(result);
       });
 });
 

module.exports = router;