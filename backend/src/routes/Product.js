const express = require("express");
const {
  createProduct,
  getProducts,
  editProduct,
  deleteProduct,
  getProductById,
  getProductsByCategoryAndSubcategory,
  getProductsByCategory,
  getProductsByCategoryName,
  getProductsByIds,
} = require("../controller/Product");
const { authenticateToken } = require("../utils/authMiddleware");
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

// Create a new product (Admin only, with multiple image upload)
router.post(
  "/create-product",
  authenticateToken,
  isAdmin,
  upload.array("images", 5),
  createProduct
);



// Get all products
router.get("/all-products", getProducts);

// Edit a product (Admin only, with multiple image upload)
router.put(
  "/:id",
  authenticateToken,
  isAdmin,
  upload.array("images", 5),
  editProduct
);
router.get("/single-product/:id", getProductById);

router.get("/by-ids", getProductsByIds);

router.get("/byCategory", getProductsByCategoryName);

router.get(
  "/all-products/category/:category/subcategory/:subcategory",
  getProductsByCategoryAndSubcategory
);
// Delete a product (Admin only)
router.delete("/:id", authenticateToken, isAdmin, deleteProduct);

module.exports = router;
