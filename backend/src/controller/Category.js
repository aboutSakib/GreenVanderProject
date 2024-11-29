const Category = require("../models/Category");

// Create a new category
async function createCategory(req, res, next) {
  try {
    const { name, subcategories } = req.body;

    // Check if a category with the same name already exists
    const existingCategory = await Category.findOne({ name: name });

    if (existingCategory) {
      // Category exists, check if the subcategories need to be updated
      const newSubcategories = subcategories.filter(
        subcategory => !existingCategory.subcategories.includes(subcategory)
      );

      if (newSubcategories.length > 0) {
        // Update the existing category with new subcategories
        existingCategory.subcategories.push(...newSubcategories);
        await existingCategory.save();

        return res.status(200).json({
          message: "Category updated successfully with new subcategories.",
          category: existingCategory,
        });
      } else {
        // Subcategories already exist, no update needed
        return res.status(200).json({
          message: "Category and subcategories already exist.",
          category: existingCategory,
        });
      }
    } else {
      // Category does not exist, create a new one
      const newCategory = new Category({ name, subcategories });
      const savedCategory = await newCategory.save();

      return res.status(201).json({
        message: "Category created successfully.",
        category: savedCategory,
      });
    }
  } catch (error) {
    next(error);
  }
}

// Get all categories
async function getCategories(req, res, next) {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

// Edit a category
async function editCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { name, subcategories } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, subcategories },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
}

// Delete a category
async function deleteCategory(req, res, next) {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createCategory,
  getCategories,
  editCategory,
  deleteCategory,
};
