import express from "express";

import { adminOnly } from "../middlewares/auth.js";
import { newProduct } from "../controllers/product.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express();
app.post("/new",singleUpload, newProduct)

export default app;


