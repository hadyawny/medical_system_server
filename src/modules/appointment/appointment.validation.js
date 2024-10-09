import Joi from "joi";

// Validation schema for creating an appointment (Doctor only)
 const createAppointmentVal = Joi.object({
  date: Joi.date().iso().required(),
  time: Joi.string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/) // "HH:mm" format validation
    .required(),

});

// Validation schema for booking an appointment (Patient only)
const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

// Validation schema for updating appointment status (Doctor/Patient)
 const updateAppointmentStatusVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  status: Joi.string()
    .valid("available", "booked", "done", "cancelled","doneAndReviewed")
    .required()
});


export { createAppointmentVal, paramsIdVal, updateAppointmentStatusVal };
