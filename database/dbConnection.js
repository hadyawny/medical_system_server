import mongoose from "mongoose";
export const dbConnection = () => {
  mongoose.connect(process.env.DB_STRING)
    .then(() => {
      console.log("Mongodb is connected");
    })
    .catch((err) => {
      console.log("database error", err);
    });
};


