const ComboOffer = require('../models/ComboOffer');
const deleteImage = require('../utils/image');

// Add a new combo offer
async function addComboOffer(req, res, next) {
  try {
    const { title, link } = req.body;
    const imageUrl = req.file ? `public/uploads/products/${req.file.filename}` : null;
    console.log(title,link,imageUrl);
    

    if (!imageUrl) {
      return res.status(400).json({ message: 'Combo offer image is required' });
    }

    const comboOffer = new ComboOffer({ title, imageUrl, link });
    const savedOffer = await comboOffer.save();

    res.status(201).json({
      message: 'Combo offer added successfully',
      offer: savedOffer,
    });
  } catch (error) {
    next(error);
  }
}

// Get all combo offers
async function getComboOffers(req, res, next) {
  try {
    const offers = await ComboOffer.find().sort({ createdAt: -1 });
    res.status(200).json(offers);
  } catch (error) {
    next(error);
  }
}

// Delete a combo offer
async function deleteComboOffer(req, res, next) {
  try {
    const { id } = req.params;
    const deletedOffer = await ComboOffer.findByIdAndDelete(id);

    // delete the uploaded image of the combo offer
    if (deletedOffer?.imageUrl){
      deleteImage(deletedOffer.imageUrl);
    }

    if (!deletedOffer) {
      return res.status(404).json({ message: "Combo offer not found" });
    }

    res.status(200).json({ message: 'Combo offer deleted successfully' });
  } catch (error) {
    next(error);
  }
}

module.exports = { addComboOffer, getComboOffers, deleteComboOffer };
