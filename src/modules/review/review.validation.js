import Joi from 'joi';

// Joi schema for adding a review
const addReviewVal = Joi.object({
  description: Joi.string().min(5).max(500).required(),
  stars: Joi.number().min(1).max(5).required(),
  doctor: Joi.string().hex().length(24).required(),   // Assuming MongoDB ObjectId format
});

// Joi schema for updating a review
const updateReviewVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  description: Joi.string().min(5).max(500),
  stars: Joi.number().min(1).max(5),
});

const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});


export { addReviewVal, updateReviewVal, paramsIdVal };
