const FlashOffer = require("../models/FlashOffer");

// Get all offers
exports.getOffers = async (req, res) => {
  try {
    const offers = await FlashOffer.find();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new offer
exports.createOffer = async (req, res) => {
  const { name1, name2 } = req.body;
  try {
    const newOffer = new FlashOffer({ name1, name2 });
    await newOffer.save();
    res.status(201).json(newOffer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an offer by ID
exports.updateOffer = async (req, res) => {
  const { id } = req.params;
  const { name1, name2 } = req.body;
  try {
    const updatedOffer = await FlashOffer.findByIdAndUpdate(
      id,
      { name1, name2 },
      { new: true }
    );
    if (!updatedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.json(updatedOffer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an offer by ID
exports.deleteOffer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOffer = await FlashOffer.findByIdAndDelete(id);
    if (!deletedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.json({ message: "Offer deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
