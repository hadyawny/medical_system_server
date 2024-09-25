import { globalError } from "../middleware/globalError.js";
import appointmentRouter from "./appointment/appointment.routes.js";
import authRouter from "./auth/auth.routes.js";
import reviewRouter from "./review/review.routes.js";
import userRouter from "./user/user.routes.js";

export const bootstrap = (app) => {

  app.use("/api/v1/users",userRouter);
  app.use("/api/v1/auth",authRouter);
  app.use("/api/v1/reviews",reviewRouter);
  app.use("/api/v1/appointments",appointmentRouter);



  app.get('/',(req,res)=>res.send("Welcome to medical system API please select any of available Endpoints"))

  app.use(globalError);
};
