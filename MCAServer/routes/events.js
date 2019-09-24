const express = require('express');
const ObjectID = require('mongodb').ObjectID;
var router = express.Router();

router.get('/events', (req,res) => {
   console.log(req.session)
    dbo.collection("events").find({}).toArray( function(err, result) {
        if (err) {
            res.status(500).send({error:err});
        }
        res.send(result);
      });
});

router.post('/create', (req,res) => {

console.log(req.session);
    if(req.session.user.role === 'Admin'){
        dbo.collection("events").insertOne(req.body, function(err, result) {
            if (err) {
                res.status(500).send({error:err});
            }
            res.send({message:"Event Created"});
          });
    } else {
        res.status(401).send();
    }

});

router.delete('/delete/:id', (req,res) => {
    console.log(req.params.id)
     dbo.collection("events").deleteOne({_id:new ObjectID(req.params.id)}, function(err, result) {
         console.log(result);
         if (err) {
             res.status(500).send({error:err});
         }
         res.send(result);
       });
 });
 



module.exports = router;