const express = require("express");
const {
  addOrder,
  updateOrderStatus,
  getOrders,
  getSingleOrder,
} = require("../controller/Order");
const { authenticateToken } = require("../utils/authMiddleware");

const router = express.Router();

function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
}

// function isCustomer(req, res, next) {
//   if (req.user && req.user.role === "customer") {
//     next();
//   } else {
//     return res.status(403).json({ message: "Access denied. Admins only." });
//   }
// }

// Add a new order (Users)
router.post("/add-order", addOrder);
// Update order status (Admins only)
router.put("/update-order/:id", authenticateToken, isAdmin, updateOrderStatus);
router.get("/all-orders/:userId", getSingleOrder);
// Get orders (Admins can see all, users can see their own)
router.get("/all-orders", getOrders);

module.exports = router;
