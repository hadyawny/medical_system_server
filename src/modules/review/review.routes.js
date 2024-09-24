import express from "express";
import { validation } from "../../middleware/validation.js";

import { protectedRoutes } from "../auth/auth.controller.js";
import { addReviewVal, paramsIdVal } from "./review.validation.js";
import { addReview, deleteReview, getReviewsByDoctor, getReviewsByPatient, updateReview } from "./review.controller.js";

const reviewRouter = express.Router();

reviewRouter.route("/")
.post(protectedRoutes,validation(addReviewVal),addReview)


reviewRouter.route("/:id")
.get(validation(paramsIdVal),getReviewsByDoctor)
.get(validation(paramsIdVal),getReviewsByPatient)
.delete(protectedRoutes,validation(paramsIdVal),updateReview)
.delete(protectedRoutes,validation(paramsIdVal),deleteReview)



export default reviewRouter;
