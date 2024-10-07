import Joi from 'joi';


const addRecordVal = Joi.object({
    // doctorId: Joi.string().required(),
    patientId: Joi.string().required(),
    appointmentDate: Joi.string().required(), // Assuming Date in the unix timestamp format as a string
    doctorNotes: Joi.string().required(),
    diagnosis: Joi.string().required(),
    prescriptions: Joi.string().required(),
    followUpPlan: Joi.string().required(),
});

const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
  });



export { addRecordVal,paramsIdVal };
