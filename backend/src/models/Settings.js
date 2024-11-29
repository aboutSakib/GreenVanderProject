const mongoose = require("../config/dbConfig");

const settingsSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  currency: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Settings", settingsSchema);
