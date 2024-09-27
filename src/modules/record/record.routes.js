import express from "express";
import { validation } from "../../middleware/validation.js";
import { protectedRoutes } from "../auth/auth.controller.js";

import { addRecordVal } from "./record.validation.js";
import { addRecord, getRecords } from "./record.controller.js";

const recordRouter = express.Router();

recordRouter.route("/")
    .post(protectedRoutes, validation(addRecordVal), addRecord)



recordRouter.route("/:userId")
    .get(getRecords)



export default recordRouter;
