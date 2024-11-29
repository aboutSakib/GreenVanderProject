const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., "Buy 3 products"
  title: { type: String, required: true }, // e.g., "Only 2599tk"
  details: { type: String, required: true }, // e.g., "Buy any 3 products and get free delivery"
  discountPrice: { type: Number, required: true }, // e.g., 2599
  freeDelivery: { type: Boolean, default: false },
});

module.exports = mongoose.model('Offer', offerSchema);
