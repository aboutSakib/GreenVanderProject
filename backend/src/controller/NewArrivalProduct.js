const NewArrivalProduct = require("../models/NewArrivalProduct");
const deleteImage = require("../utils/image");

// Add a new new arrival product
async function addNewArrivalProduct(req, res, next) {
  try {
    const { title, link } = req.body;
    const imageUrl = req.file ? `public/uploads/products/${req.file.filename}` : null;

    // Check if the image URL is provided
    if (!imageUrl) {
      return res.status(400).json({ message: "New Arrival image is required" });
    }

    // Create a new arrival product object
    const newArrivalProduct = new NewArrivalProduct({ title, imageUrl, link });
    const savedProduct = await newArrivalProduct.save();

    // Respond with the saved product
    res.status(201).json({
      message: "New Arrival image added successfully",
      product: savedProduct,
    });
  } catch (error) {
    next(error);
  }
}

// Get all new arrival products
async function getNewArrivalProducts(req, res, next) {
  const { page = 1, limit = 10 } = req.query;

  // Convert page and limit to integers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  try {
    const products = await NewArrivalProduct.find()
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

// Delete a new arrival product
async function deleteNewArrivalProduct(req, res, next) {
  try {
    const { id } = req.params;
    const deletedProduct = await NewArrivalProduct.findByIdAndDelete(id);

    // delete the uploaded image
    if (deletedProduct?.imageUrl) {
      await deleteImage(deletedProduct.imageUrl);
    }

    // Check if the product exists
    if (!deletedProduct) {
      return res.status(404).json({ message: "New Arrival image not found" });
    }

    // Respond with a success message
    res.status(200).json({ message: "New Arrival image deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = { addNewArrivalProduct, getNewArrivalProducts, deleteNewArrivalProduct };
