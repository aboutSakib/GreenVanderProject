const mongoose = require("../config/dbConfig");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategories: [{ type: String }],
});

module.exports = mongoose.model("Category", categorySchema);