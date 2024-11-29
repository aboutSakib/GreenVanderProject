const express = require("express");
const {
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} = require("../controller/FlashOffer");
const router = express.Router();

router.get("/", getOffers);
router.post("/", createOffer);
router.put("/:id", updateOffer);
router.delete("/:id", deleteOffer);

module.exports = router;
