//API For events collection

const express = require('express');
const ObjectID = require('mongodb').ObjectID;
var router = express.Router();

//Return all the events from the DB
router.get('/events', (req,res) => {
   console.log(req.session)
    dbo.collection("events").find({}).toArray( function(err, result) {
        if (err) {
            res.status(500).send({error:err});
        }
        res.send(result);
      });
});

//Creating an event in the DB
router.post('/create', (req,res) => {

console.log(req.session);
    if(req.session.user.role === 'Admin'){
        req.body.startDate = new Date(req.body.startDate);
            req.body.endDate = new Date(req.body.endDate);
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

//Updating an event
router.put('/update', (req,res) => {

    console.log(req.session);
        if(req.session.user.role === 'Admin'){
            let update = Object.assign({}, req.body);
            delete update._id;
            req.body.startDate = new Date(req.body.startDate);
                req.body.endDate = new Date(req.body.endDate);
            dbo.collection("events").updateOne({_id:new ObjectID(req.body._id)}, { $set:update}, function(err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).send({error:err});
                } else{

                res.send({message:"Event Updated"});
                }
              });
        } else {
            res.status(401).send();
        }
    
});

//Delete an event
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