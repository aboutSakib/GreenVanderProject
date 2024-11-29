const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: { type: String },
  customerName: { type: String },
  customerEmail: { type: String },
  customerPhone: { type: String },
  shippingAddress: { type: String },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: { type: String }, // Product name
      image: { type: String }, // Product image URL
      colors: [{ type: String }], // Available colors for the product
      sizes: [{ type: String }], // Available sizes for the product
      quantity: { type: Number },
    },
  ],
  totalAmount: { type: Number },
  paymentMethod: {
    type: String,
    enum: ["Cash On Delivery"],
  }, // Add paymentMethod field
  status: {
    type: String,
    enum: [
      "Pending",
      "Confirm",
      "Payment",
      "Shipped",
      "Delivered",
      "Cancelled",
      "Return",
    ],
    default: "Pending",
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
