import Joi from 'joi';


const addRecordVal = Joi.object({
    doctorId: Joi.string().required(),
    appointmentDate: Joi.string().required(), // Assuming Date in the unix timestamp format as a string
    doctorNotes: Joi.string().required(),
    diagnosis: Joi.string().required(),
    prescriptions: Joi.string().required(),
    followUpPlan: Joi.string().required(),
});





export { addRecordVal };
