const mongoose = require('mongoose');

const newArrivalProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  link: { type: String }, // Optional
  createdAt: { type: Date, default: Date.now }
});

// Ensure the model name is consistent with the filename
module.exports = mongoose.model('NewArrivalProduct', newArrivalProductSchema);
