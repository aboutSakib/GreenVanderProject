const express = require("express");
const router = express.Router();
const {
  createCoupon,
  getAllCoupons,
  applyCoupon,
  deleteCoupon,
} = require("../controller/Coupon");

// Create a new coupon (Admin only)
router.post("/create", createCoupon);

// Get all coupons (Admin view)
router.get("/", getAllCoupons);

// Apply a coupon (for users during checkout)
router.post("/apply", applyCoupon);

// Delete a coupon (Admin only)
router.delete("/:id", deleteCoupon);

module.exports = router;
