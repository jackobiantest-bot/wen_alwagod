const Joi  = require("joi");

const registerSchema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(9).max(10).required(),
    password: Joi.string().min(6).required(),
    passwordConfirm: Joi.string().valid(Joi.ref('password')),
});

const loginSchema = Joi.object({
    phone: Joi.string().min(9).max(10).required(),
    password: Joi.string().min(6).required()
});


module.exports.register = async (req, res, next) => {    
    try {
        
        const value = await registerSchema.validateAsync(req.body, { abortEarly: false });
        
        req.validatedBody = value;

        return next()
    } catch(error) {
        return next(error)
    }
}

module.exports.login = async (req, res, next) => {

    try {
        const value  = await loginSchema.validateAsync(req.body, { abortEarly: false });
        
        req.validatedBody = value;   

        next()
    } catch(error) {
        console.log(error);
        next(error);
    }
}