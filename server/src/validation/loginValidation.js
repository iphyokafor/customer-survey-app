import Joi from 'joi';

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({minDomainAtoms: 2})
            .min(3)
            .max(100)
            .trim()
            .required(),
        password: Joi.string()
            .alphanum()
            .min(8)
            .required()
    });
    return Joi.validate(data, schema);
};


export default loginValidation;