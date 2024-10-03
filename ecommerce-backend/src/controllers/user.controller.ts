import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../utils/mailtrap/emails.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, password, photo, gender, _id, dob } = req.body;

    if (!_id || !name || !email || !password || !photo || !gender || !dob)
      return next(new ErrorHandler("Please add all fields", 400));

    const userAlreadyExists = await User.findById(_id);
    console.log(userAlreadyExists);

    if (userAlreadyExists) {
      return next(new ErrorHandler(`Welcome, ${userAlreadyExists.name}`, 400));
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      photo,
      gender,
      _id,
      dob: new Date(dob),
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);
    // Return success response
    res.status(201).json({
      success: true,
      message: "User  created successfully",
      user: { ...user, password: undefined }, // exclude password for security reasons
    });
  }
);

export const verifyEmail = TryCatch(async (req, res, next) => {
  const { code } = req.body;
  console.log("verification code ", code);

  const user = await User.findOne({
    verificationToken: code,
    verificationTokenExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired verification code",
    });
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;
  await user.save();

  await sendWelcomeEmail(user.email, user.name);

  res.status(200).json({
    success: true,
    message: "Email verified successfully",
    user: {
      ...user,
      password: undefined,
    },
  });
});
export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});
  return res.status(200).json({
    success: true,
    message: "All users",
    users,
  });
});
export const getUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Invalid Id", 400));
  return res.status(200).json({
    success: true,
    user,
  });
});
export const deleteUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Invalid Id", 400));
  await user.deleteOne();
  return res.status(200).json({
    success: true,
    message: "User deleted Successfully",
  });
});
export const SignInUser = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("Invalid Email or Password", 401));

  const isPasswordValid = await bcryptjs.compare(password, user.password);

  if (!isPasswordValid) {
    return next(new ErrorHandler("Invalid Password", 401));
  }
  generateTokenAndSetCookie(res, user._id);

  user.lastLogin = new Date();
  await user.save();

  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    user: {
      ...user,
      password: undefined,
    },
  });
});

export const forgetPassword = TryCatch(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  //user not exist
  if (!user) return next(new ErrorHandler("User Not Found", 404));

  //generate reset token using crypto
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpiresAt = resetTokenExpiresAt;

  await user.save();
  // send email
  await sendPasswordResetEmail(
    user.email,
    `${process.env.CLIENT_URL}/reset-password/${resetToken}`
  );

  res
    .status(200)
    .json({ success: true, message: "Password reset link sent to your email" });
});

export const resetPassword = TryCatch(async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: {
      $gt: Date.now(),
    },
  });
  if (!user)
    return next(new ErrorHandler("Invalid or expired reset token", 404));
  //update password
  const hashedPassword = await bcryptjs.hash(password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  //save
  await user.save();
  await sendResetSuccessEmail(user.email);

  res.status(200).json({
    success: true,
    message: "Password reset Successfully",
  });
});

export const checkAuth = TryCatch(async (req, res, next) => {
  console.log(req.userId);

  const user = await User.findById(req.userId).select("-password");
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, user });
});
