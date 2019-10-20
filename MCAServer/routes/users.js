//API for users collection

const express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;

//Create a user in DB
router.post('/create', (req,res) => {

    dbo.collection("users").findOne({userName:req.body.userName}, function(err, result) {
        if (err) {
            res.status(500).send({error:err});
        } else if(result){
            res.status(500).send({error:"User with this username already exist!"})
        } else {
            dbo.collection("users").insertOne(req.body, function(err, result) {
                if (err) {
                    res.status(500).send({error:err});
                }
                res.send({message:"User Created"});
              });
        }
      });
   
   
});

//Validate user details from the DB and updating last login timestamp.
router.post('/login', (req,res) => {
    console.log(req.session);
    dbo.collection("users").findOne({userName:req.body.userName,password:req.body.password}, function(err, result) {
        if (err) {
            res.status(500).send({error:err});
        } else if(result){
            req.session.user = result;
            console.log(req.session);
            dbo.collection("users").updateOne({_id:new ObjectID(result._id)}, { $set:{lastLogin:new Date()}}, function(err, result2) {
                if (err) {
                    console.log(err);
                    res.status(500).send({error:err});
                } else{
                    res.send(result);
                }
            });
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

//Delete a user
router.delete('/deleteUser/:id', (req,res) => {
    console.log(req.params.id)
     dbo.collection("users").deleteOne({_id:new ObjectID(req.params.id)}, function(err, result) {
         console.log(result);
         if (err) {
             res.status(500).send({error:err});
         }
         res.send(result);
       });
 });
 



module.exports = router;