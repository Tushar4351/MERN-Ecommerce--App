import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (
  res: Response,
  userId: string
): string => {
  const jwtSecret = process.env.JWT_SECRET;
  console.log(jwtSecret);

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: "7d",
  });

  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  // });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // Always true for cross-domain
    sameSite: "none", // Changed from "strict" to "none" for cross-domain
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

// res.cookie("token", token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "strict",
//   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
// });
