import multer from "multer";

const fileUpload = () => {
  const storage = multer.diskStorage({});

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("images only", 401), false);
    }
  }

  const upload = multer({ storage, fileFilter });

  return upload;
};

// export const uploadSingleFile = (fieldName) => fileUpload().single(fieldName);

// export const uploadArrayOfFiles = (fieldName) => fileUpload().array(fieldName,10);

// export const uploadFields = (fields) => fileUpload().fields(fields);
export const uploadProfileAndDocs = fileUpload().fields([
  { name: "profilePicture", maxCount: 1 },     // Single file for profile picture
  { name: "verifyingDocs", maxCount: 10 },     // Multiple files for verifying documents
]);