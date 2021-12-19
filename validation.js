const Joi = require('@hapi/joi');

//register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(255)
            .required(),
        'email': Joi.string()
            .min(7)
            .max(255)
            .required()
            .email(),
        'password': Joi.string()
            .min(8)
            .max(1024)
            .required(),
        'contact': Joi.string()
            .min(10)
            .max(10)
            .required()
    });

    return schema.validate(data);
    
}

//login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        'email': Joi.string()
            .min(7)
            .max(255)
            .required()
            .email(),
        'password': Joi.string()
            .min(8)
            .max(1024)
            .required()
    });

    
    return schema.validate(data);
}




module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;