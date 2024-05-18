import { User } from "../models/user.model.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

//Middlewear to check if the user is admin
export const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;
  if (!id)
    return next(new ErrorHandler("Login first to access this resource", 401));

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Login Id is not Match", 401));
  if (user.role !== "admin")
    return next(
      new ErrorHandler(
        "You are not authorized to access this resource Only Admin can access",
        401
      )
    );
  next();
});
