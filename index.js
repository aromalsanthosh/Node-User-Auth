const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

//import route
const authRoute = require('./routes/auth');
const getDetailsRoute = require('./routes/getDetails');


//connect to db
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true,useUnifiedTopology:true},(err) => {
    if(err) throw err;
    console.log('connected to db');
});

app.use(express.json());


//route middleware
app.use('/api/user', authRoute);
app.use('/api/getDetails', getDetailsRoute);



app.listen(3000, () => {
    console.log('listening on port 3000');
});
