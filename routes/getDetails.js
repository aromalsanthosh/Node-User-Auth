const router = require('express').Router();
const User = require('../model/User');

//import auth from verifyToken
const verify = require('./verifyToken');


router.get('/:id',verify, (req, res) => {
    //find user 
    User.findById(req.params.id, (err, user) => {
        if(err) return res.status(400).send(err);
        res.send(user);
    });
});



module.exports = router;