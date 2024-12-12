import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import Stripe from "stripe";
import { v2 as cloudinary } from "cloudinary";

//importing routes
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/products.route.js";
import orderRoute from "./routes/order.route.js";
import paymentRoute from "./routes/payment.route.js";
import dashboardRoute from "./routes/adminDashboard.route.js";
import cors from "cors";

config({
  path: "./.env",
});

const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
const ClientUrl = process.env.CLIENT_URL || "";

connectDB(mongoURI);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const stripe = new Stripe(stripeSecretKey);
export const myCache = new NodeCache();
const app = express();

app.use(express.json()); //allows us to parse incoming requests:req.body
app.use(cookieParser()); // allows us to parse incoming cookies
app.use(morgan("dev"));
app.use(
  cors({
    origin: ClientUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

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
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
