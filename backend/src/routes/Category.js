const express = require("express");
const {
  createCategory,
  getCategories,
  editCategory,
  deleteCategory,
} = require("../controller/Category");
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

// Create a new category (Admin only)
router.post("/create-category", authenticateToken, isAdmin, createCategory);

// Get all categories
router.get("/all-category", getCategories);

// Edit a category (Admin only)
router.put("/:id", authenticateToken, isAdmin, editCategory);

// Delete a category (Admin only)
router.delete("/:id", authenticateToken, isAdmin, deleteCategory);

module.exports = router;
