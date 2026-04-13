const joi = require('joi');
const userRegisterValidationSchema = joi.object({
    username:joi.string().trim().required().min(4).max(64),
    email:joi.string().trim().email().required().lowercase(),
    password:joi.string().trim().required().min(6).max(126)
});

const userLoginValidationSchema = joi.object({
    email:joi.string().trim().email().required().lowercase(),
    password:joi.string().trim().required().min(8).max(126)
});

// return multiple values form a file
module.exports ={
    userRegisterValidationSchema: userRegisterValidationSchema,
    userLoginValidationSchema: userLoginValidationSchema
}