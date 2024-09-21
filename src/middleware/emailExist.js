import { userModel } from "../../database/models/user.model.js";
import { AppError } from "../utils/appError.js";




export const checkEmail = async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });

  if (user) return next(new AppError("email already exists",409))


  next()
}


