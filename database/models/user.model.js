import mongoose from "mongoose";
import bcrypt from "bcrypt";

const specialtiesEnum = [
  "dermatology",
  "dentistry",
  "psychiatry",
  "pediatrics and new born",
  "neurology",
  "orthopedics",
  "gynaecology and infertility",
  "ear, nose and throat",
  "cardiology and vascular disease",
  "internal medicine",
  "allergy and immunology",
  "andrology and male infertility",
  "audiology",
  "cardiology and thoracic surgery",
  "chest and respiratory",
  "diabetes and endocrinology",
  "diagnostic radiology",
  "dietitian and nutrition",
  "family medicine",
  "gastroenterology and endoscopy",
  "geriatrics",
  "hematology",
  "hepatology",
  "interventional radiology",
  "ivf and infertility",
  "laboratories",
  "nephrology",
  "neurosurgery",
  "obesity and laparoscopic surgery",
  "oncology",
  "oncology surgery",
  "ophthalmology",
  "none",
];

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
    profilePicture: {
      type: String,
      trim: true,
    },
    verifyingDocs:[{
      type: String,
    }],
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
    drSpecialties: {
      type: String,
      enum: specialtiesEnum,
      default: "none",
    },
    drLocation: {
      type: String,
    },
    drWorkingHours: {
      type: String,
    },
    drBio: {
      type: String,
    },
    drSessionFees: {
      type: Number,   // Assuming the fee is a number (currency)
      min: 0          // The fee must be a non-negative number
    },
  
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    verifiedDoctor: {
      type: String,
      enum: ["false", "pending", "true"], // Updated roles
      default: "false",
    },
    otp: {
      type: String,
      trim: true,
    },
    otpExpires: {
      type: Date,
    },
    passwordChangedAt: Date,

    reviewsReceived: [{ type: mongoose.Types.ObjectId, ref: "review" }],
    reviewsWritten: [{ type: mongoose.Types.ObjectId, ref: "review" }],

    bookedAppointments: [{ type: mongoose.Types.ObjectId, ref: "appointment" }],

    createdAppointments: [{ type: mongoose.Types.ObjectId, ref: "appointment" }],

    medicalRecords: [],
  },
  { timestamps: true }
);

schema.pre("save", function (next) {
  // If the password field is not modified, continue without re-hashing
  if (!this.isModified("password")) return next();

  // Hash the password with 8 salt rounds (or modify for higher rounds if desired)
  this.password = bcrypt.hashSync(this.password, 8);
  
  // Proceed with the next middleware or saving process
  next();
});


export const userModel = mongoose.model("user", schema);
