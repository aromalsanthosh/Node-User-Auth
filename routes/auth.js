const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');

//validation
const { registerValidation, loginValidation } = require('../validation');

//register
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


//login
router.post('/login', async (req,res) => {
    const {error} = loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    
    //check if user exists
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send('Email or password is incorrect');
    }

    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
        return res.status(400).send('Email or password is incorrect');
    }

    //login successful
    res.send('Login successful');
});






module.exports = router;