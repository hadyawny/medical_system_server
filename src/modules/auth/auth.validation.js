
import Joi from "joi"

const signupSchemaVal = Joi.object({
    name: Joi.string().min(2).max(20).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    rePassword: Joi.valid(Joi.ref('password')).required(),
    role: Joi.string().valid("patient", "doctor", "admin")

})

const signinSchemaVal = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    
})

const changePasswordVal = Joi.object({
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    newPassword: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),

})

const validateEmailSchema = Joi.object({
    params: Joi.object({
      token: Joi.string().required() 
    })
  });

  const forgotPasswordVal = Joi.object({
    email: Joi.string().email().trim().required(),

  });

const resetPasswordVal = Joi.object({
    email: Joi.string().email().trim().required(),
    otp: Joi.string().length(6).trim().required(),
    newPassword: Joi.string()
    .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .required(),
    rePassword: Joi.valid(Joi.ref("newPassword")).required()
  
  });
export {
    signinSchemaVal,
    signupSchemaVal,
    changePasswordVal,
    validateEmailSchema,
    resetPasswordVal,
    forgotPasswordVal
}