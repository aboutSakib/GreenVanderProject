const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  discount: { type: Number, min: 1, max: 100 }, // Assuming percentage discount
  expiresAt: { type: Date }, // Expiration date
  isActive: { type: Boolean }, // Whether the coupon is active
});

// Export the Coupon model
module.exports = mongoose.model("Coupon", couponSchema);
