import { request } from "express";
import { reviewModel } from "../../../database/models/review.model.js";
import { catchError } from "../../middleware/catchError.js";

const addReview = catchError(async (req, res, next) => {
  req.body.patient = req.user._id;
  let review = new reviewModel(req.body); 
  await review.save();
  res.json({
      message: "Review added successfully",
      review: {
          title: review.title,
          stars: review.stars,
          patient: review.patient,
          doctor: review.doctor
      }
  });
});


const getReviewsByDoctor = catchError(async (req, res, next) => {
  const { doctorId } = req.params;  
  const reviews = await reviewModel.find({ doctor: doctorId });

  res.json({
      message: "Reviews fetched successfully",
      reviews
  });
});

const getReviewsByPatient = catchError(async (req, res, next) => {
  const { patientId } = req.params;  // Assuming patientId is passed in the route
  const reviews = await reviewModel.find({ patient: patientId });

  res.json({
      message: "Patient's reviews fetched successfully",
      reviews
  });
});

const deleteReview = catchError(async (req, res, next) => {
  const { reviewId } = req.params;

  // Find and delete the review by reviewId and patientId
  const review = await reviewModel.findOneAndDelete({
    _id: reviewId,
    patient: req.user._id  // Ensure the patient is the authenticated user
  });

  if (!review) {
    return res.status(404).json({ message: "Review not found or unauthorized to delete" });
  }

  res.json({
    message: "Review deleted successfully",
    reviewId
  });
});

const updateReview = catchError(async (req, res, next) => {
  const { reviewId } = req.params;

  // Assign the patient's ID from the authenticated user (assuming req.user exists)
  req.body.patient = req.user._id;


  // Find the review by reviewId and patientId
  const updatedReview = await reviewModel.findOneAndUpdate(
    { _id: reviewId, patient: req.user._id },  // Search by both reviewId and patientId
    req.body,
    { new: true }
  );

  if (!updatedReview) {
    return res.status(404).json({ message: "Review not found or unauthorized to update" });
  }

  res.json({
    message: "Review updated successfully",
    review: updatedReview
  });

});






export { addReview ,updateReview ,deleteReview,getReviewsByPatient,getReviewsByDoctor};
