const mongoose = require("../config/dbConfig");

const pageSettingsSchema = new mongoose.Schema({
  aboutUs: { type: String, default: "" },
  deliveryPolicy: { type: String, default: "" },
  returnPolicy: { type: String, default: "" },
  termsCondition: { type: String, default: "" },
  privacyPolicy: { type: String, default: "" },
  socialMedia: {
    facebook: { type: String, default: "" },
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
    youtube: { type: String, default: "" },
  },
  popupImageUrl: { type: String, default: "" },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PageSettings", pageSettingsSchema);
