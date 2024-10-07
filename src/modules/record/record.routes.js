import express from "express";
import { validation } from "../../middleware/validation.js";
import { protectedRoutes } from "../auth/auth.controller.js";

import { addRecordVal } from "./record.validation.js";
import {  addRecord, getRecords } from "./records.js";

const recordRouter = express.Router();

recordRouter.route("/")
    .post(protectedRoutes,addRecord)

recordRouter.route("/:id")
    .get(getRecords)



export default recordRouter;
