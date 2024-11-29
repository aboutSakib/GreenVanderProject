const express = require("express");
const {
  getPageSettings,
  updatePageSettings,
} = require("../controller/PageSettings");
const { authenticateToken } = require("../utils/authMiddleware");
const upload = require("../config/multerConfig"); // Multer configuration for image upload

const router = express.Router();

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
}

// Get current page settings (Admins only)
router.get("/get-settings", getPageSettings);

// Update page settings (Admins only, with image upload)
router.put(
  "/update-settings",
  authenticateToken,
  isAdmin,
  upload.single("popupImage"),
  updatePageSettings
);

module.exports = router;
