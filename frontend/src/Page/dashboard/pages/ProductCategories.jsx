import React, { useEffect, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify"; // Optional: for toast notifications
import AddCategory from "../components/AddCategory";

const ProductCategories = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]); // State to store categories
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedCategory, setSelectedCategory] = useState(null); // To handle edit
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await fetch(
        `${apiUrl}/api/categories/all-category`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setCategories(data); // Set the fetched categories
      } else {
        console.error("Failed to fetch categories", data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle Edit Category
  const handleEdit = (category) => {
    setSelectedCategory(category); // Set the category to edit
    setOpen(true); // Open modal
  };

  // Handle Delete Category
  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${apiUrl}/api/categories/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setCategories(
          categories.filter((category) => category._id !== categoryId)
        );
        toast.success("Category deleted successfully!"); // Optional: for notification
      } else {
        toast.error("Failed to delete category."); // Optional: for notification
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("An error occurred while deleting the category."); // Optional: for notification
    }
  };

  const handleClickOpen = () => {
    setSelectedCategory(null); // Reset selected category on new add
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null); // Reset selected category when closing modal
  };

  // Refresh categories after adding or editing
  const refreshCategories = () => {
    fetchCategories(); // Refetch the categories from the backend
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="pt-20 pb-5 px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Categories</h2>
        <button
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          onClick={handleClickOpen}
        >
          <FiPlus className="mr-2" />
          Add Category
        </button>
      </div>

      {/* Add/Edit Category Modal */}
      <AddCategory
        open={open}
        handleClose={handleClose}
        category={selectedCategory}
        refreshCategories={refreshCategories}
      />

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6">Category Name</th>
              <th className="py-3 px-6">Subcategories</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {categories.map((category) => (
              <tr
                key={category._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{category.name}</td>
                <td className="py-3 px-6">
                  {category.subcategories.join(", ")}
                </td>
                <td className="py-3 px-6 flex justify-end gap-4">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
                  >
                    <FiEdit className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                  >
                    <FiTrash2 className="mr-2" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductCategories;
