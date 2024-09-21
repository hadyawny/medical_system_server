import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { catchError } from "../../middleware/catchError.js";
import { userModel } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/appError.js";
import transporter from "../../utils/email.js";
import otpGenerator from "otp-generator";

const signup = catchError(async (req, res, next) => {
  let user = new userModel(req.body);
  await user.save();

  let token = jwt.sign(
    { userId: user._id, role: user.role, email: user.email },
    process.env.JWT_KEY
  );

  transporter.sendMail({
    from: process.env.EMAIL,
    to: user.email,
    subject: "Email verification",
    text: "Please validate you email address",
    html: `<a href="${req.protocol}://${req.headers.host}/api/v1/auth/validate/${token}">Click here to confirm your email address</a>`,
  });
  res.json({
    message: "success",
    token,
    user_id: user._id,
    user_role: user.role,
  });
});

const signin = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_KEY
    );
    return res.json({
      message: "success",
      token,
      user_id: user._id,
      user_role: user.role,
    });
  }

  next(new AppError("incorrect email or password", 401));
});

const changePassword = catchError(async (req, res, next) => {
  let user = await userModel.findById(req.user._id);
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_KEY
    );
    user.password = req.body.newPassword;
    user.passwordChangedAt = Date.now();

    await user.save();
    return res.json({ message: "success", token });
  }

  next(new AppError("incorrect email or password", 401));
});

const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return next(new AppError("token is not provided", 401));

  let decoded = jwt.verify(token, process.env.JWT_KEY);
  let user = await userModel.findById(decoded.userId);
  if (!user) return next(new AppError("user is not found", 401));

  if (user.passwordChangedAt) {
    let time = parseInt(user.passwordChangedAt.getTime() / 1000);
    if (time > decoded.iat)
      return next(new AppError("invalid token log in again", 401));
  }

  req.user = user;

  next();
});

const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("you are not authorized", 401));

    next();
  });
};

const validateEmail = catchError(async (req, res) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const { email } = decoded;
  await userModel.findOneAndUpdate({ email }, { confirmEmail: true });
  res.json({ message: "Email verified successfully" });
});

const forgotPassword = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });

  if (user) {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    user.otp = bcrypt.hashSync(otp, 8); // Hash the OTP
    user.otpExpires = Date.now() + 10 * 60 * 1000; // Set expiration time (10 minutes)
    await user.save();

    // Send OTP via email
    transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "OTP For Changing Password",
      text: `Your OTP for changing the password is: ${otp}`, // Send plain OTP in the email
      html: `<p>Your OTP for changing the password is: <strong>${otp}</strong></p>`,
    });

    return res.json({ message: "success" });
  }

  res.status(404).json({ message: "user not found" });
});

const resetPassword = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });

  if (user && user.otpExpires > Date.now()) {
    const isOtpValid = bcrypt.compareSync(req.body.otp, user.otp); // Compare hashed OTP

    if (isOtpValid) {
      user.password = req.body.newPassword;
      user.otp = undefined; // Clear OTP
      user.otpExpires = undefined; // Clear expiration
      await user.save();

      return res.json({ message: "successfully changed password" });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  }

  res.status(404).json({ message: "user not found or OTP expired" });
});

export {
  signup,
  signin,
  changePassword,
  protectedRoutes,
  allowedTo,
  validateEmail,
  forgotPassword,
  resetPassword,
};
