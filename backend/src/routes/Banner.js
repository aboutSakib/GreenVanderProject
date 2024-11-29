const express = require("express");
const { addBanner, getBanners, deleteBanner } = require("../controller/Banner");
const upload = require("../config/multerConfig");

const router = express.Router();
// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
}

// Add a new banner (authenticated and admin users only)
router.post(
  "/add-banner",

  upload.single("image"),
  addBanner
);

// Get all banners (authenticated and admin users only)
router.get("/all-banners", getBanners);

// Delete a banner (authenticated and admin users only)
router.delete("/delete-banner/:id", deleteBanner);

module.exports = router;
