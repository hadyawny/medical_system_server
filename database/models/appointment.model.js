import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // Example: "14:00"
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "booked", "done", "cancelled","doneAndReviewed"],
      default: "available",
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Assuming User model
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Assuming User model
      required: true,
    },
  },
  { timestamps: true }
);

export const appointmentModel = mongoose.model("appointment", schema);
