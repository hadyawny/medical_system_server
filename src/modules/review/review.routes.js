import express from "express";
import { validation } from "../../middleware/validation.js";

import { protectedRoutes } from "../auth/auth.controller.js";
import { addReviewVal, paramsIdVal, updateReviewVal } from "./review.validation.js";
import { addReview, deleteReview, getReviewsByDoctor, getReviewsByPatient, updateReview } from "./review.controller.js";

const reviewRouter = express.Router();

reviewRouter.route("/")
.post(protectedRoutes,validation(addReviewVal),addReview)


reviewRouter.route("/:id")
.put(protectedRoutes,validation(updateReviewVal),updateReview)
.delete(protectedRoutes,validation(paramsIdVal),deleteReview)

reviewRouter.route("/doctors/:id")
.get(validation(paramsIdVal),getReviewsByDoctor)

reviewRouter.route("/patients/:id")
.get(validation(paramsIdVal),getReviewsByPatient)



export default reviewRouter;
