import express from "express";
import { validation } from "../../middleware/validation.js";
import { addUser, adminDeleteUser, deleteUser, getAllUsers, getSingleUser, updateDrInfo, updateDrStatus, updateUser } from "./user.controller.js";
import { addUserVal, paramsIdVal, UpdateDrInfoVal, updateDrStatusVal, updateUserVal } from "./user.validation.js";
import { checkEmail } from "../../middleware/emailExist.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { uploadProfileAndDocs } from "../../services/pictureUpload/fileUploads.js";

const userRouter = express.Router();

userRouter.route("/")
.post(validation(addUserVal),checkEmail,addUser)
.get(getAllUsers)
.put(protectedRoutes,validation(updateUserVal),updateUser)
.delete(protectedRoutes,deleteUser)

userRouter.route("/drinfo")
.put(protectedRoutes,uploadProfileAndDocs,validation(UpdateDrInfoVal),updateDrInfo)

userRouter.route("/admin/:id")
.put(protectedRoutes,allowedTo("admin"),validation(updateDrStatusVal),updateDrStatus)
.delete(protectedRoutes,allowedTo("admin"),validation(paramsIdVal),adminDeleteUser)


userRouter.route("/:id")
.get(validation(paramsIdVal),getSingleUser)

export default userRouter;
