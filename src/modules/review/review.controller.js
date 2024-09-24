import { reviewModel } from "../../../database/models/review.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";

const addReview = catchError(async (req, res, next) => {
  req.body.patient = req.user._id;
  let review = new reviewModel(req.body); 
  await review.save();

  let patient = await userModel.findById(req.user._id);
  let doctor = await userModel.findById(req.body.doctor);


  // Add the review to the patient's reviewsWritten array
  patient.reviewsWritten.push(review._id);
  
  // Add the review to the doctor's reviewsReceived array
  doctor.reviewsReceived.push(review._id);

  // Save both patient and doctor to persist the changes
  await patient.save();
  await doctor.save();


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
  const { id } = req.params;  
  const reviews = await reviewModel.find({ doctor: id });

  res.json({
      message: "Reviews fetched successfully",
      reviews
  });
});

const getReviewsByPatient = catchError(async (req, res, next) => {
  const { id } = req.params;  // Assuming patientId is passed in the route
  const reviews = await reviewModel.find({ patient: id });

  res.json({
      message: "Patient's reviews fetched successfully",
      reviews
  });
});

const deleteReview = catchError(async (req, res, next) => {
  const { id } = req.params;

  // Find and delete the review by reviewId and patientId
  const review = await reviewModel.findOneAndDelete({
    _id: id,
    patient: req.user._id  // Ensure the patient is the authenticated user
  });

  if (!review) {
    return res.status(404).json({ message: "Review not found or unauthorized to delete" });
  }

  // Find the patient by ID and remove the review from reviewsWritten
  let patient = await userModel.findById(req.user._id);
  patient.reviewsWritten = patient.reviewsWritten.filter(
    reviewId => reviewId.toString() !== id
  );
  await patient.save();

  // Find the doctor by ID and remove the review from reviewsReceived
  let doctor = await userModel.findById(review.doctor);
  doctor.reviewsReceived = doctor.reviewsReceived.filter(
    reviewId => reviewId.toString() !== id
  );
  await doctor.save();

  res.json({
    message: "Review deleted successfully",
  });
});


const updateReview = catchError(async (req, res, next) => {
  const { id } = req.params;

  // Assign the patient's ID from the authenticated user (assuming req.user exists)
  req.body.patient = req.user._id;


  // Find the review by reviewId and patientId
  const updatedReview = await reviewModel.findOneAndUpdate(
    { _id: id, patient: req.user._id },  // Search by both reviewId and patientId
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
