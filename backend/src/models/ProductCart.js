const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    email: { type: String },
    images: { type: String },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    }, // Add productId field
    name: { type: String },
    colors: { type: String },
    sizes: { type: String },
    price: { type: Number },
    originalPrice: { type: Number },
    quantity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductCart", cartItemSchema);
