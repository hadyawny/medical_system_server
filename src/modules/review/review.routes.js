import express from "express";
import { validation } from "../../middleware/validation.js";
import { addUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "./user.controller.js";
import { addUserVal, paramsIdVal, updateUserVal } from "./user.validation.js";
import { checkEmail } from "../../middleware/emailExist.js";
import { protectedRoutes } from "../auth/auth.controller.js";

const userRouter = express.Router();

userRouter.route("/")
.post(validation(addUserVal),checkEmail,addUser)
.get(getAllUsers)
.put(protectedRoutes,validation(updateUserVal),updateUser)
.delete(protectedRoutes,deleteUser)

userRouter.route("/:id")
.get(validation(paramsIdVal),getSingleUser)

export default userRouter;
