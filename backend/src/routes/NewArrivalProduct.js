const express = require("express");
const {
  addNewArrivalProduct,
  getNewArrivalProducts,
  deleteNewArrivalProduct,
} = require("../controller/NewArrivalProduct");
const upload = require("../config/multerConfig");

const router = express.Router();


// Add a new new arrival product (authenticated and admin users only)
router.post(
  "/add-new-arrival",
  upload.single("image"), // Upload middleware

  addNewArrivalProduct // Controller function
);

// Get all new arrival products (authenticated and admin users only)
router.get("/all-new-arival-products", getNewArrivalProducts);

// Delete a new arrival product (authenticated and admin users only)
router.delete("/delete-new-arrival/:id", deleteNewArrivalProduct);

module.exports = router;
