const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  value: {
    shoulder: {
      type: String,
      required: true,
      default: 0,
      min: 0, // Optional: Ensure positive values
    },
    chest: {
      type: String,
      required: true,
      default: 0,
      min: 0, // Optional: Ensure positive values
    },
  },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }], // Array to store image URLs
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  stockStatus: {
    type: String,
    enum: ["In Stock", "Out of Stock"],
    required: true,
  }, // Required field
  discount: { type: Number, default: 0 },
  quantity: { type: Number, required: true }, // Required field
  colors: [{ type: String }],
  sizes: [{ type: String }],
  sku: [{ type: String }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  subcategory: { type: String },
  measurements: [measurementSchema], // Array of measurements
});

module.exports = mongoose.model("Product", productSchema);
