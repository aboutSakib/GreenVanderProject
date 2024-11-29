const express = require("express");
const { addShippingMethod, getAllShippingMethods, updateShippingMethod } = require("../controller/ShippingMethod");
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

// Add a new shipping method (Admins only)
router.post("/add-shipping", authenticateToken, isAdmin, addShippingMethod);

// Get all shipping methods (Public)
router.get("/all-shipping-methods", getAllShippingMethods);

// Update a shipping method (Admins only)
router.put("/update-shipping/:id", authenticateToken, isAdmin, updateShippingMethod);

module.exports = router;
