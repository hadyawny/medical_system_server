import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "admin"], // Updated roles
      default: "patient",
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      trim: true,
    },
    otpExpires: {
      type: Date, 
    },
    passwordChangedAt: Date,
    bookedAppointments: [],

    createdAppointments: [],

    medicalRecords: [],
  },
  { timestamps: true }
);

schema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 8);
});

schema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 8);
});

export const userModel = mongoose.model("user", schema);
