import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
  },
  description: {
      type: String,
      required: true,
  },
  stars: {
      type: Number,
      required: true,
      min: 1,
      max: 5
  },
  patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',  // Assuming User model
      required: true,
  },
  doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',  // Assuming User model
      required: true,
  },

  },
  { timestamps: true }
);



export const reviewModel = mongoose.model("review", schema);

