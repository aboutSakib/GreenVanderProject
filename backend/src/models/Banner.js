
const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  link: { type: String }, // Optional
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.banner ?? mongoose.model("Banner", bannerSchema);
