import express from "express";
import { validation } from "../../middleware/validation.js";
import { addUser, deleteUser, getAllUsers, getSingleUser, updateDrInfo, updateUser } from "./user.controller.js";
import { addUserVal, paramsIdVal, UpdateDrInfoVal, updateUserVal } from "./user.validation.js";
import { checkEmail } from "../../middleware/emailExist.js";
import { protectedRoutes } from "../auth/auth.controller.js";
import { uploadProfileAndDocs } from "../../services/pictureUpload/fileUploads.js";

const userRouter = express.Router();

userRouter.route("/")
.post(validation(addUserVal),checkEmail,addUser)
.get(getAllUsers)
.put(protectedRoutes,validation(updateUserVal),updateUser)
.delete(protectedRoutes,deleteUser)

userRouter.route("/drinfo")
.put(protectedRoutes,uploadProfileAndDocs,validation(UpdateDrInfoVal),updateDrInfo)
    

userRouter.route("/:id")
.get(validation(paramsIdVal),getSingleUser)

export default userRouter;
