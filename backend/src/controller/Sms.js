const SMS = require("../models/Sms");

// Add a new SMS
async function addSMS(req, res, next) {
  try {
    const { firstName, email, subject, message } = req.body;

    const newSMS = new SMS({
      firstName,
      email,
      subject,
      message,
    });

    const savedSMS = await newSMS.save();
    res.status(201).json({ message: "SMS added successfully", sms: savedSMS });
  } catch (error) {
    next(error);
  }
}

// Get all SMS records
async function getAllSMS(req, res, next) {
  try {
    const smsList = await SMS.find();
    res.status(200).json(smsList);
  } catch (error) {
    next(error);
  }
}

// Delete an SMS
async function deleteSMS(req, res, next) {
  try {
    const { id } = req.params;

    const deletedSMS = await SMS.findByIdAndDelete(id);
    if (!deletedSMS) {
      return res.status(404).json({ message: "SMS not found" });
    }

    res.status(200).json({ message: "SMS deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = { addSMS, getAllSMS, deleteSMS };
