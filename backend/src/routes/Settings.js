const express = require("express");
const { getSettings, updateSettings } = require("../controller/Settings");
const { authenticateToken } = require("../utils/authMiddleware");

const router = express.Router();

// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
}

// Get website settings (Admins only)
router.get("/get-settings", authenticateToken, isAdmin, getSettings);

// Update website settings (Admins only)
router.put("/update-settings", authenticateToken, isAdmin, updateSettings);

module.exports = router;
