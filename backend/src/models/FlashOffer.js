const mongoose = require("mongoose");

const flashOfferSchema = new mongoose.Schema({
  name1: { type: String, required: true },
  name2: { type: String, required: true },
});

module.exports = mongoose.model("FlashOffer", flashOfferSchema);
