const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');

//validation
const { registerValidation, loginValidation } = require('../validation');

router.post('/register',async (req,res) => {
    const {error} = registerValidation(req.body);
    
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    //check if user already exists
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists){
        return res.status(400).send('Email already exists');
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);




    //create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        contact: req.body.contact
    });

    try{
        const newUser = await user.save();
        res.send({user: newUser._id});
    }catch(err){
        res.status(400).send(err);
    }
});



module.exports = router;