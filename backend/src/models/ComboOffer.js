const mongoose = require('mongoose');

const comboOfferSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  link: { type: String }, // Optional
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ComboOffer', comboOfferSchema);
