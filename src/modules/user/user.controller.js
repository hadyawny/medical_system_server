import jwt from "jsonwebtoken";
import { userModel } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne, getAllOne, getSingleOne } from "../handler/handlers.js";

const addUser = catchError(async (req, res,next) => {

  let user = new userModel(req.body)
  await user.save()
  res.json({ message: "success" , user: {name: user.name , email: user.email} })
})
const updateUser = catchError(async (req, res,next) => {

  let user = await userModel.findByIdAndUpdate(req.user._id, req.body,{new: true})
  !user && res.status(404).json({ message: "user not found" });
  user && res.json({ message: "success", user });
})

const getAllUsers = getAllOne(userModel,['bookedAppointments', 'createdAppointments','reviewsReceived','reviewsWritten']);

const getSingleUser = getSingleOne(userModel,['bookedAppointments', 'createdAppointments','reviewsReceived','reviewsWritten']);

const deleteUser = catchError(async (req, res,next) => {
    let user = await userModel.findByIdAndDelete(req.user._id);
    !user && res.status(404).json({ message: "user not found" });
    user && res.json({ message: "success", user });
  });



export { addUser ,getAllUsers , getSingleUser ,deleteUser,updateUser};
