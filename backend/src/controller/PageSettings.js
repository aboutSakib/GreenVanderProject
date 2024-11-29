const PageSettings = require("../models/PageSettings");
const deleteImage = require("../utils/image");

// Get current page settings
async function getPageSettings(req, res, next) {
  try {
    const settings = await PageSettings.findOne();
    if (!settings) {
      return res.status(404).json({ message: "Page settings not found" });
    }
    res.status(200).json(settings);
  } catch (error) {
    next(error);
  }
}

// Update page settings
async function updatePageSettings(req, res, next) {
  try {
    const {
      aboutUs,
      deliveryPolicy,
      returnPolicy,
      socialMedia,
      termsCondition,
      privacyPolicy,
    } = req.body;
    const popupImageUrl = req.file ? req.file.path : null;

    let settings = await PageSettings.findOne();

    // delete the previous image
    if (popupImageUrl && settings.popupImageUrl) {
      deleteImage(settings.popupImageUrl);
    }
    
    
    if (!settings) {
      // Create a new settings document if it doesn't exist
      settings = new PageSettings({
        aboutUs,
        deliveryPolicy,
        returnPolicy,
        termsCondition,
        privacyPolicy,
        socialMedia: {
          facebook: socialMedia?.facebook || "",
          instagram: socialMedia?.instagram || "",
          twitter: socialMedia?.twitter || "",
          youtube: socialMedia?.youtube || "",
        },
        popupImageUrl,
      });
    } else {
      // Update existing settings document
      settings.aboutUs = aboutUs;
      settings.deliveryPolicy = deliveryPolicy;
      settings.returnPolicy = returnPolicy;
      settings.termsCondition = termsCondition;
      settings.privacyPolicy = privacyPolicy;
      settings.socialMedia = socialMedia || {};
      if (popupImageUrl) {
        settings.popupImageUrl = popupImageUrl;
      }
      settings.updatedAt = Date.now();
    }

    const updatedSettings = await settings.save();
    res.status(200).json({
      message: "Page settings updated successfully",
      settings: updatedSettings,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getPageSettings, updatePageSettings };
