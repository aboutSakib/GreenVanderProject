const express = require("express");
const router = express.Router();
const {
  addCartItem,
  getCartItems,
  deleteCartItem,
  getAllCartItems,
  clearCart,
  updateCartQuantity,
} = require("../controller/ProductCart");

// Get Cart Items for a User by Email
router.get("/:email", getCartItems);
router.get("/", getAllCartItems);
router.delete("/:email/clear", clearCart);
// Delete a Cart Item by Email and Product ID
router.delete("/:email/:itemId", deleteCartItem);

router.put("/:email/:itemId", updateCartQuantity);

// Add a Cart Item for a User
router.post("/", addCartItem);

module.exports = router;
