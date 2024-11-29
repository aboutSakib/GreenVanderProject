const express = require("express");
const router = express.Router();
const {
  addComboCartItem,
  getComboCartItems,
  deleteComboCartItem,
  getAllComboCartItems,
} = require("../controller/ComboCart");
const { authenticateToken } = require("../utils/authMiddleware");

// Middleware to check if the user is an admin
function isUser(req, res, next) {
  if (req.user && req.user.role === "customer") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
}

// Get Cart Items for a User by Email
router.get("/:email", getComboCartItems);
router.get("/", getAllComboCartItems);

// Delete a Cart Item by Email and Product ID
router.delete(
  "/:email/:itemId",

  deleteComboCartItem
);

// Add a Cart Item for a User
router.post("/", addComboCartItem);

module.exports = router;
