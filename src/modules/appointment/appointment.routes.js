import express from "express";
import { validation } from "../../middleware/validation.js";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createAppointmentVal, paramsIdVal, updateAppointmentStatusVal } from "./appointment.validation.js";
import { bookAppointment, createAppointment, deleteAppointment, getAllUsersAppointments, getSingleUserAppointment, updateAppointmentStatus } from "./appointment.controller.js";

const appointmentRouter = express.Router();

appointmentRouter.route("/")
.post(protectedRoutes,allowedTo("doctor"),validation(createAppointmentVal),createAppointment)
.get(getAllUsersAppointments)

appointmentRouter.route("/book/:id")
.put(protectedRoutes,allowedTo("patient"),validation(paramsIdVal),bookAppointment)

appointmentRouter.route("/:id")
.put(protectedRoutes,validation(updateAppointmentStatusVal),updateAppointmentStatus)
.delete(protectedRoutes,allowedTo("doctor"),validation(paramsIdVal),deleteAppointment)
.get(validation(paramsIdVal),getSingleUserAppointment)




export default appointmentRouter;
