const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact_name: { type: String, required: true },
  contact_number: { type: String, required: true },
  address: { type: String, required: true },
  city_id: { type: String, required: true },
  zone_id: { type: String, required: true },
  area_id: { type: String, required: true },
});

module.exports = mongoose.model("Store", storeSchema);
