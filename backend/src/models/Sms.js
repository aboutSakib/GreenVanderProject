const mongoose = require("../config/dbConfig");

const smsSchema = new mongoose.Schema({
  firstName: { type: String },
  email: { type: String }, // Phone number or recipient identifier
  subject: { type: String },
  message: { type: String }, // Message content
  status: {
    type: String,
    enum: ["Sent", "Pending", "Failed"],
    default: "Pending",
  }, // Status of the SMS
  createdAt: { type: Date, default: Date.now }, // Timestamp of when the SMS was created
});

module.exports = mongoose.model("SMS", smsSchema);
