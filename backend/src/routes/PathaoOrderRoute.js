// routes/orderRoutes.js
const express = require("express");
const { getStores } = require("../controller/PathaoOrderController");
const router = express.Router();

router.get("/stores", getStores);

module.exports = router;
