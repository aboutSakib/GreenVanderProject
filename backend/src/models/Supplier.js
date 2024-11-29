const mongoose = require("../config/dbConfig");

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactEmail: { type: String, required: true, unique: true },
  contactPhone: { type: String, required: true },
  address: { type: String, required: true },
  productsSupplied: [
    {
      productName: { type: String, required: true },
      quantity: { type: Number, required: true, default: 0 }, // Add quantity field
    },
  ],
});

module.exports = mongoose.model("Supplier", supplierSchema);
