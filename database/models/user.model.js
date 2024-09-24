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
      type: [
        {
          day: String, // e.g., Monday, Tuesday
          start: String, // e.g., 09:00
          end: String, // e.g., 17:00
        },
      ],
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
