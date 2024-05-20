import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please Enter Name"] },
    photo: { type: String, required: [true, "Please add photo"] },
    price: { type: Number, required: [true, "Please Enter the Price"] },
    stock: { type: Number, required: [true, "Please Enter the Stock"] },
    category: {
      type: String,
      required: [true, "Please Enter Product Category"],
      trim: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
