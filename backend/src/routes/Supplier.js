const express = require("express");
const {
  addSupplier,
  updateSupplier,
  getSuppliers,
  deleteSupplier,
} = require("../controller/Supplier");
// const { authenticateToken } = require("../utils/authMiddleware");

const router = express.Router();

// Middleware to check if the user is an admin
// function isAdmin(req, res, next) {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     return res.status(403).json({ message: "Access denied. Admins only." });
//   }
// }

// Add a new supplier (Admins only)
router.post("/add-supplier", addSupplier);

// Update supplier details (Admins only)
router.put("/update-supplier/:id", updateSupplier);

// Get suppliers with optional search (Admins only)
router.get("/all-suppliers", getSuppliers);

// Delete a supplier (Admins only)
router.delete("/delete-supplier/:id", deleteSupplier);

module.exports = router;
