const express = require("express");
const {
  getFlashSaleStatus,
  createOrUpdateFlashSale,
  deleteFlashSale,
  getFlashSale,
} = require("../controller/FlashSale");

const router = express.Router();

// Flash sale routes
router.get("/", getFlashSaleStatus);
router.get("/getFlashSale", getFlashSale);
router.post("/", createOrUpdateFlashSale);
router.delete("/:id", deleteFlashSale);

module.exports = router;
