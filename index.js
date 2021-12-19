const express = require('express');
const app = express();
const mongooose = require('mongoose');
const dotenv = require('dotenv').config();

//import route
const authRoute = require('./routes/auth');

//connect to db
mongooose.connect(process.env.DB_CONNECT,{useNewUrlParser:true,useUnifiedTopology:true},(err) => {
    if(err) throw err;
    console.log('connected to db');
});

app.use(express.json());


//route middleware
app.use('/api/user', authRoute);



app.listen(3000, () => {
    console.log('listening on port 3000');
});
