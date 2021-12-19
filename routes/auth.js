const router = require('express').Router();

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


    //create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact: req.body.contact
    });

    try{
        const newUser = await user.save();
        res.send(newUser);
    }catch(err){
        res.status(400).send(err);
    }
});



module.exports = router;