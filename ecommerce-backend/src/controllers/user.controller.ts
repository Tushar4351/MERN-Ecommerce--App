import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";


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

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      photo,
      gender,
      _id,
      dob: new Date(dob),
    });

    generateTokenAndSetCookie(res, user._id);
    // Return success response
    res.status(201).json({
      success: true,
      message: "User  created successfully",
      user: { ...user, password: undefined }, // exclude password for security reasons
    });
  }
);

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
export const logout = TryCatch(async (req, res, next) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
});



export const checkAuth = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, user });
});
