import Joi from "joi";

const addUserVal = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .required(),
  rePassword: Joi.valid(Joi.ref("password")).required(),
  role: Joi.string().valid("patient", "doctor", "admin"), // Updated roles
});

const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateUserVal = Joi.object({
  name: Joi.string().min(2).max(30),
  mobileNumber: Joi.string().min(9).max(15),
});

export { addUserVal, paramsIdVal, updateUserVal };
