const express = require('express');
const app = express();

//import route
const authRoute = require('./routes/auth');

//route middleware
app.use('/api/user', authRoute);



app.listen(3000, () => {
    console.log('listening on port 3000');
});
