import jwt from "jsonwebtoken";
import { userModel } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne, getAllOne, getSingleOne } from "../handler/handlers.js";
import cloudinary from "../../services/pictureUpload/cloudinary.js";

const addUser = catchError(async (req, res,next) => {

  let user = new userModel(req.body)
  await user.save()
  res.json({ message: "success" , user: {name: user.name , email: user.email} })
})
const updateUser = catchError(async (req, res,next) => {

  let user = await userModel.findByIdAndUpdate(req.user._id, req.body,{new: true})
  !user && res.status(404).json({ message: "user not found" });
  user && res.json({ message: "success", user });
})


const updateDrInfo = catchError(async (req, res, next) => {
  const { files } = req;


  // Initialize an object to hold URLs for verification documents
  const verifyingDocsUrls = [];

  try {
    // Upload profile picture to Cloudinary
    if (files.profilePicture && files.profilePicture.length > 0) {
      const profilePicResult = await cloudinary.uploader.upload(
        files.profilePicture[0].path
      );
      req.body.profilePicture = profilePicResult.secure_url;
    }

    // Upload verifyingDocs to Cloudinary
    if (files.verifyingDocs && files.verifyingDocs.length > 0) {
      for (const file of files.verifyingDocs) {
        const result = await cloudinary.uploader.upload(file.path);
        verifyingDocsUrls.push(result.secure_url);  // Store the URL of each uploaded file
      }
      req.body.verifyingDocs = verifyingDocsUrls;  // Save all URLs in req.body
    }

    req.body.verifiedDoctor = 'pending'; // Set the initial verification status

    // Update user data in MongoDB
    const user = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Success", user });
  } catch (error) {
    console.error("Error during upload or database update:", error);
    res.status(500).json({ message: "An error occurred during the update." });
  }
});

const updateDrStatus = catchError(async (req, res,next) => {

  let user = await userModel.findByIdAndUpdate(req.params.id, req.body,{new: true})
  !user && res.status(404).json({ message: "user not found" });
  user && res.json({ message: "success", user });
})

const adminDeleteUser = catchError(async (req, res,next) => {

  let user = await userModel.findByIdAndDelete(req.params.id, req.body,{new: true})
  !user && res.status(404).json({ message: "user not found" });
  user && res.json({ message: "success", user });
})

const getAllUsers = getAllOne(userModel,['bookedAppointments', 'createdAppointments','reviewsReceived','reviewsWritten']);

const getSingleUser = getSingleOne(userModel,['bookedAppointments', 'createdAppointments','reviewsReceived','reviewsWritten']);

const deleteUser = catchError(async (req, res,next) => {
    let user = await userModel.findByIdAndDelete(req.user._id);
    !user && res.status(404).json({ message: "user not found" });
    user && res.json({ message: "success", user });
  });



export { addUser ,getAllUsers , getSingleUser ,deleteUser,updateUser,updateDrInfo,updateDrStatus,adminDeleteUser
};
