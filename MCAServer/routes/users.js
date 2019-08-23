const express = require('express');
var router = express.Router();
const db = require('../mongodb');

router.post('/create', (req,res) => {
   
    dbo.collection("users").insertOne(req.body, function(err, result) {
        if (err) {
            res.status(500).send({error:err});
        }
        req.session.user = req.body;
        console.log(req.session);
        res.send({message:"User Created"});
      });
});


router.post('/login', (req,res) => {
    console.log(req.session);
    dbo.collection("users").findOne(req.body, function(err, result) {
        if (err) {
            res.status(500).send({error:err});
        } else if(result)
            res.send(result);
            else res.status(401).send({error:'User Not Found'});
      });
});

module.exports = router;