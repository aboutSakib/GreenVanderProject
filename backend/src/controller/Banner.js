const Banner = require("../models/Banner");
const deleteImage = require("../utils/image");

// Add a new banner
async function addBanner(req, res, next) {
  try {
    const { title, link } = req.body;
    const imageUrl = req.file
      ? `public/uploads/products/${req.file.filename}`
      : null;
    console.log(imageUrl);
    if (!imageUrl) {
      return res.status(400).json({ message: "Banner image is required" });
    }

    const newBanner = new Banner({ title, imageUrl, link });
    const savedBanner = await newBanner.save();
    res
      .status(201)
      .json({ message: "Banner added successfully", banner: savedBanner });
  } catch (error) {
    next(error);
  }
}

// Get all banners
async function getBanners(req, res, next) {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (error) {
    next(error);
  }
}

// Delete a banner
async function deleteBanner(req, res, next) {
  try {
    const { id } = req.params;
    const deletedBanner = await Banner.findByIdAndDelete(id);

    if (deletedBanner?.imageUrl){
      deleteImage(deletedBanner.imageUrl)
    }
      if (!deletedBanner) {
        return res.status(404).json({ message: "Banner not found" });
      }

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = { addBanner, getBanners, deleteBanner };
