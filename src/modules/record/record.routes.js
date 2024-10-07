import express from "express";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

import { addRecordVal, paramsIdVal } from "./record.validation.js";
import {  addRecord, getRecords } from "./records.js";

const recordRouter = express.Router();

recordRouter.route("/")
    .post(protectedRoutes,allowedTo("doctor"),validation(addRecordVal),addRecord)

recordRouter.route("/:id")
    .get(protectedRoutes,allowedTo("doctor"),validation(paramsIdVal),getRecords)



export default recordRouter;
