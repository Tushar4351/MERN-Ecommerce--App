import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";

//importing routes
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/products.route.js";

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
app.use("/api/v1/product", productRoute);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
