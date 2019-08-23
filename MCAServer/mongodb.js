var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://mca:mcamongo123@cluster0-k0fcd.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  global.dbo = db.db('mca');
});
