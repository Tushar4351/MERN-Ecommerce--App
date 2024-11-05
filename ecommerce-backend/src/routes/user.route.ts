import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  newUser,
  SignInUser,
  checkAuth,
  logout
} from "../controllers/user.controller.js";
import { adminOnly } from "../middlewares/auth.js";
import { verifyToken } from "../middlewares/verifytoken.js";

const app = express.Router();
//route - /api/v1/user/check-auth
app.get("/check-auth", verifyToken, checkAuth);
//route - /api/v1/user/new
app.post("/new", newUser);
//route - /api/v1/user/logout
app.post("/logout", logout);
//route - /api/v1/user/signin
app.post("/signin", SignInUser);
//route - /api/v1/user/all
app.get("/all", adminOnly, getAllUsers);
//route - /api/v1/user/dynamicID

// we can write like this also

// app.get("/:id", getUser);
// app.delete("/:id", deleteUser);

app.route("/:id").get(getUser).delete(adminOnly, deleteUser);

export default app;
