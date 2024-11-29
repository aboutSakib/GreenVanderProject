const mongoose = require("../config/dbConfig");

const shippingMethodSchema = new mongoose.Schema({
  name: { type: String, enum: ["Steadfast", "Pathao", "RedX", "Sundorban"], required: true },
  cost: { type: Number, required: true }, // Cost of the shipping method
  estimatedDeliveryTime: { type: String, required: true }, // e.g., "2-3 days"
  isActive: { type: Boolean, default: true } // Indicates if the shipping method is active
});

module.exports = mongoose.model("ShippingMethod", shippingMethodSchema);
