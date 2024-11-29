const Settings = require("../models/Settings");

// Get current website settings
async function getSettings(req, res) {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }
    res.status(200).json(settings);
  } catch (error) {
    next(error);
  }
}

// Update website settings
async function updateSettings(req, res) {
  try {
    const { phone, whatsappNumber, email, address, currency } = req.body;

    let settings = await Settings.findOne();
    if (!settings) {
      // If settings do not exist, create a new document
      settings = new Settings({
        phone,
        whatsappNumber,
        email,
        address,
        currency,
      });
    } else {
      // If settings exist, update the document
      settings.phone = phone;
      settings.whatsappNumber = whatsappNumber;
      settings.email = email;
      settings.address = address;
      settings.currency = currency;
      settings.updatedAt = Date.now();
    }

    const updatedSettings = await settings.save();
    res
      .status(200)
      .json({
        message: "Settings updated successfully",
        settings: updatedSettings,
      });
  } catch (error) {
    next(error);
  }
}

module.exports = { getSettings, updateSettings };
