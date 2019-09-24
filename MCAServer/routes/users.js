const express = require('express');
var router = express.Router();

router.post('/create', (req,res) => {
   
    dbo.collection("users").insertOne(req.body, function(err, result) {
        if (err) {
            res.status(500).send({error:err});
        }
        res.send({message:"User Created"});
      });
});


router.post('/login', (req,res) => {
    console.log(req.session);
    dbo.collection("users").findOne(req.body, function(err, result) {
        if (err) {
            res.status(500).send({error:err});
        } else if(result){
            req.session.user = result;
            console.log(req.session);
            res.send(result);
        } else res.status(401).send({error:'User Not Found'});
      });
});

router.get('/getAllUsers', (req,res) => {
    dbo.collection("users").find({}).toArray( function(err, result) {
        if (err) {
            res.status(500).send({error:err});
        }
        res.send(result);
      });
});


module.exports = router;