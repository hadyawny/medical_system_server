import Joi from "joi";

const specialtiesEnum = ["dermatology",
"dentistry",
"psychiatry",
"pediatrics-and-new-born",
"neurology",
"orthopedics",
"gynaecology-and-infertility",
"ear-nose-and-throat",
"cardiology-and-vascular-disease",
"internal-medicine",
"allergy-and-immunology",
"andrology-and-male-infertility",
"audiology",
"cardiology-and-thoracic-surgery",
"chest-and-respiratory",
"diabetes-and-endocrinology",
"diagnostic-radiology",
"dietitian-and-nutrition",
"family-medicine",
"gastroenterology-and-endoscopy",
"geriatrics",
"hematology",
"hepatology",
"interventional-radiology",
"ivf-and-infertility",
"laboratories",
"nephrology",
"neurosurgery",
"obesity-and-laparoscopic-surgery",
"oncology",
"oncology-surgery",
"ophthalmology"
];


const addUserVal = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .required(),
  rePassword: Joi.valid(Joi.ref("password")).required(),
  role: Joi.string().valid("patient", "doctor", "admin"), // Updated roles
});

const paramsIdVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const updateUserVal = Joi.object({
  name: Joi.string().min(2).max(30),
  mobileNumber: Joi.string().min(9).max(15),
});

const updateDrStatusVal = Joi.object({
  id: Joi.string().hex().length(24).required(),
  verifiedDoctor: Joi.string().valid("false", "pending", "true").required(),
});



const UpdateDrInfoVal = Joi.object({
  drSpecialties: Joi.string()
    .valid(...specialtiesEnum)  // Validating against the enum
    .default("none")
    .required(),

  drLocation: Joi.string().required(), // Location must be a non-empty string

  drWorkingHours: Joi.string().required(), // Array of working hours

  drBio: Joi.string()
    .max(1000)  // Assuming a max limit of 1000 characters for bio
    .optional(),

  drSessionFees: Joi.number()
    .min(0)  // Fee should be a non-negative number
    .required(),

    profilePicture: Joi.array().items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string()
          .valid("image/jpeg", "image/png", "image/jpg")
          .required(), // Ensuring only valid image types
        size: Joi.number().max(5242880).required(), // Max size of 5MB
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(), // Path of the uploaded file
      })
    ).optional(), // Marking it as optional, since it might not always be present
  

  verifyingDocs: Joi.array().items(
    Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string()
        .valid("image/jpeg", "image/png", "image/jpg")
        .required(), // Ensuring only valid image types
      size: Joi.number().max(5242880).required(), // Max size of 5MB
      destination: Joi.string().required(),
      filename: Joi.string().required(),
      path: Joi.string().required(), // Path of the uploaded file
    })
  ).optional(), // Allowing verifyingDocs as an optional array
});



export { addUserVal, paramsIdVal, updateUserVal,UpdateDrInfoVal ,updateDrStatusVal };
