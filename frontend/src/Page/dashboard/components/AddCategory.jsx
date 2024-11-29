import React, { useEffect, useState } from "react";

const AddCategory = ({ open, handleClose, category, refreshCategories }) => {
  const [categoryName, setCategoryName] = useState("");
  const [subcategories, setSubcategories] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  // Pre-fill the form if editing an existing category
  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
      setSubcategories(category.subcategories.join(", "));
    } else {
      setCategoryName("");
      setSubcategories("");
    }
  }, [category]);

  // Handle form submission for adding/editing a category
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const payload = {
        name: categoryName,
        subcategories: subcategories.split(",").map((sub) => sub.trim()), // Convert to an array
      };

      let response;
      if (category) {
        // If category exists, it's an edit operation (PUT)
        response = await fetch(
          `${apiUrl}/api/categories/${category._id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
      } else {
        // Otherwise, it's a new category (POST)
        response = await fetch(
          `${apiUrl}/api/categories/create-category`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
      }

      const data = await response.json();

      if (response.ok) {
        alert(
          category
            ? "Category updated successfully!"
            : "Category created successfully!"
        );
        handleClose();
        refreshCategories(); // Refresh categories after a successful add or edit
      } else {
        // Handle duplicate category error
        if (response.status === 400) {
          alert("Error: " + data.message);
        } else {
          alert("An error occurred. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error creating/updating category:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {category ? "Edit Category" : "Add Category"}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          {category
            ? "Edit the category details."
            : "Provide the category name and subcategories (comma-separated)."}
        </p>

        {/* Category Name Input */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <input
            id="category"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Subcategories Input */}
        <div className="mb-4">
          <label
            htmlFor="subcategories"
            className="block text-sm font-medium text-gray-700"
          >
            Subcategories (comma-separated)
          </label>
          <input
            id="subcategories"
            type="text"
            value={subcategories}
            onChange={(e) => setSubcategories(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {category ? "Save Changes" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
