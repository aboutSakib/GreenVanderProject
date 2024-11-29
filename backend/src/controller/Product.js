const Product = require("../models/Product");
const Category = require("../models/Category");
const deleteImage = require("../utils/image");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, originalPrice, stockStatus, discount, quantity, colors, sizes, category, subcategory, sku, measurements } = req.body;

    // Handle images from multer (if any)
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.path); // Store file paths (URLs)
    }

    const newProduct = new Product({
      name,
      description,
      images, // Store the image paths in the database
      price,
      originalPrice,
      stockStatus,
      discount,
      quantity,
      colors: JSON.parse(colors), // Ensure JSON stringified arrays are parsed
      sizes: JSON.parse(sizes), // Ensure JSON stringified arrays are parsed
      category,
      sku,
      subcategory,
      measurements: JSON.parse(measurements),
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit a product
async function editProduct(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description, price, originalPrice, stockStatus, discount, quantity, colors, sizes, category, sku, subcategory, measurements } = req.body;

    // Check if the category exists
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    // Handle images
    let images = req.body.images || []; // Existing images
    if (req.files && req.files.length > 0) {
      images = images.concat(req.files.map((file) => file.path)); // Add new images
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        images: JSON.parse(images),
        price,
        originalPrice,
        stockStatus,
        discount,
        quantity,
        colors: JSON.parse(colors),
        sizes: JSON.parse(sizes),
        category,
        sku: JSON.parse(sku),
        subcategory,
        measurements: JSON.parse(measurements),
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
}

// Get all products
// async function getProducts(req, res, next) {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.status(200).json(products);
//   } catch (error) {
//     next(error);
//   }
// }

async function getProducts(req, res, next) {
  const { page = 1, limit = 10 } = req.query;

  try {
    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Fetch the products with pagination
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber) // Skip documents for previous pages
      .limit(limitNumber); // Limit documents to the specified number

    // Get the total number of products for calculating total pages
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limitNumber);

    res.status(200).json({
      currentPage: pageNumber,
      totalPages,
      totalProducts,
      products,
    });
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

// Function to fetch product details from backend using product IDs
const getProductsByIds = async (req, res) => {
  const ids = req.query.ids;

  if (!ids) {
    return res.status(400).json({ message: "No product IDs provided" });
  }

  const productIds = ids.split(",").map((id) => id);

  try {
    const products = await Product.find({ _id: { $in: productIds } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

async function getProductsByCategoryName(req, res, next) {
  const { categoryName, page = 1, limit = 10 } = req.query;

  try {
    // Find the category by name to get its ID
    const category = await Category.findOne({ name: { $regex: `^${categoryName}$`, $options: "i" } });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Fetch products by category ID with pagination
    const products = await Product.find({ category: category._id })
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    // Get the total number of products in this category
    const totalProducts = await Product.countDocuments({ category: category._id });
    const totalPages = Math.ceil(totalProducts / limitNumber);

    res.status(200).json({
      currentPage: pageNumber,
      totalPages,
      totalProducts,
      products,
    });
  } catch (error) {
    next(error);
  }
}

// Delete a product
async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    // delete the uploaded images
    if (deletedProduct?.images.length > 0) {
      deletedProduct.images.forEach(async (imgURL) => {
        deleteImage(imgURL);
      });
    }

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
}
const getProductsByCategoryAndSubcategory = async (req, res) => {
  const { category, subcategory } = req.params;
  try {
    const products = await Product.find({
      category: category,
      subcategory: subcategory,
    });
    console.log(products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  editProduct,
  deleteProduct,
  getProductById,
  getProductsByCategoryAndSubcategory,
  getProductsByCategoryName,
  getProductsByIds,
};
