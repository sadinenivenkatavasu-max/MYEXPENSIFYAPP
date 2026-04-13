const joi = require('joi')

const categoriesValidationSchema =joi.object({
    name: joi.string().trim().required()
})

module.exports= categoriesValidationSchema;