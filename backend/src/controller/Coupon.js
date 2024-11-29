const Coupon = require("../models/Coupon");

// Create a new coupon
exports.createCoupon = async (req, res) => {
  try {
    const { code, discount, expiresAt } = req.body;

    // Validate the input

    // Check if a coupon with the same code already exists
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    // Create a new coupon
    const coupon = new Coupon({
      code,
      discount,
      expiresAt: new Date(expiresAt),
      isActive: true,
    });

    // Save the coupon to the database
    try {
      await coupon.save();
    } catch (saveError) {
      console.error("Error saving coupon:", saveError);
      return res.status(500).json({ message: "Failed to save coupon" });
    }

    // Send back the response with all coupon details
    res.status(201).json({
      message: "Coupon created successfully",
      coupon: {
        _id: coupon._id,
        code: coupon.code,
        discount: coupon.discount,
        expiresAt: coupon.expiresAt,
        isActive: coupon.isActive,
      },
    });
  } catch (error) {
    console.error("Coupon creation error:", error);
    res.status(500).json({ message: "Failed to create coupon" });
  }
};
// Get all coupons
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch coupons", error: error.message });
  }
};

// Apply a coupon (validate and return discount)
exports.applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    // Check if the coupon exists and is active
    const coupon = await Coupon.findOne({ code, isActive: true });

    if (!coupon) {
      return res.status(404).json({ message: "Invalid or inactive coupon" });
    }

    // Check if the coupon has expired
    if (new Date() > coupon.expiresAt) {
      return res.status(400).json({ message: "Coupon has expired" });
    }

    // Coupon is valid
    res.status(200).json({
      message: "Coupon applied successfully",
      discount: coupon.discount,
    });
  } catch (error) {
    console.error("Coupon application error:", error);
    res.status(500).json({ message: "Failed to apply coupon" });
  }
};

// Delete a coupon
exports.deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    await Coupon.findByIdAndDelete(id);
    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete coupon", error: error.message });
  }
};
