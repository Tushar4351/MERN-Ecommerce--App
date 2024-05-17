import express from "express";

//importing routes
 import userRoute from "./routes/user.route.js";
import { connectDB } from "./utils/features.js";

const port = 4000;
connectDB();
const app = express();

 app.use(express.json());

console.log("Setting up routes");

app.get("/", (req, res) => {
  console.log("Received request for /");
  res.send("API working with /api/v1");
});

app.get("/:universalURL", (req, res) => {
  res.send("404 URL NOT FOUND");
});
//using routes
 app.use("/api/v1/user", userRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
