const express = require("express");
const {
  getAllUsers,
  checkAdminStatus,
  forgotPassword,
  resetPassword,
  changePassword,
  toggleUserRole,
} = require("../controller/Authenticated");
const { authenticateToken } = require("../utils/authMiddleware");

const router = express.Router();

// Middleware to check admin role
function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
}

// Route to get all users (admin access only)
router.get("/users", authenticateToken, isAdmin, getAllUsers);

// Route to check admin status
router.get("/users/admin/:email", authenticateToken, isAdmin, checkAdminStatus);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password", resetPassword);

// Change Password (Authenticated users)
router.put("/change-password", authenticateToken, changePassword);

// Toggle user role (Admin access only)
router.put("/toggle-role/:id", authenticateToken, isAdmin, toggleUserRole);

module.exports = router;
