//External Libariries
const express = require('express');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/users');
const session = require('express-session')
const cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 , 
    credentials:true
  }

// initialize our express app
const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'TDdvuUV7yPXdvKE9JNwPeFuTPS5haLnG',
    resave: false,
    saveUninitialized: true
  }))


app.use('/api', usersRoute);
let port = 3000;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});