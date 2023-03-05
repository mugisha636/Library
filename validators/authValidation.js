const Joi = require('joi')

const schema = {
  signupvalidate: Joi.object().keys({
    email: Joi.string().required().email(),
    status:Joi.string(),
    phone: Joi.string()
                .regex(/^[0-9]{10}$/)
                .messages({'string.pattern.base': `Phone number must have 10 digits.`})
                .required(),
    username: Joi.string()
      .empty()
      .min(6)
      .max(11)
      .pattern(/^[a-zA-Z]/)
      .messages({
        "any.required": "{{#label}} field is required",
        "string.base": "{{#label}} must be of type string",
        "string.empty": "{{#label}} can not be empty",
        "string.pattern.base":
          "{{#label}} must contain only characters from a to z.",
      }),
    password: Joi.string()
      .required()
      .empty()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]\\|;:'",.<>/?])[A-Za-z\d!@#$%^&*()\-_=+{}[\]\\|;:'",.<>/?]{8,}$/)
      .messages({
        "any.required": "{{#label}} field is required",
        "string.base": "{{#label}} must be of type string",
        "string.empty": "{{#label}} can not be empty",
        "string.pattern.base":
          "{{#label}} must contain at least a number, a special character, an upper-case letter and longer than 8 characters",
      }),
      
  }),

  signin: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const { signupvalidate } = schema;

class AuthValidation {
  static async verifySignup(req, res, next) {
    const { error } = signupvalidate.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/["'`]+/g, ""),
      });
    }
    return next();
  }
  
}
module.exports= AuthValidation;