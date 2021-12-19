const router = require('express').Router();

const User = require('../model/User');

//validation
const Joi = require('@hapi/joi');
const { valid } = require('@hapi/joi');


const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(255)
        .required(),
    'email': Joi.string()
        .min(7)
        .max(255)
        .required(),
    'password': Joi.string()
        .min(8)
        .max(1024)
        .required(),
    'contact': Joi.string()
        .min(10)
        .max(10)
        .required()
});

router.post('/register',async (req,res) => {

    const validation = schema.validate(req.body);
    
    res.send(validation);
    


    // const user = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     contact: req.body.contact
    // });

    // try{
    //     const newUser = await user.save();
    //     res.send(newUser);
    // }catch(err){
    //     res.status(400).send(err);
    // }
});



module.exports = router;