/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import Select from "react-select";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // For filtering results
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProductData, setEditProductData] = useState(null); // Hold the product data being edited
  const [categories, setCategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // For filtering based on search input
  const [selectedCategory, setSelectedCategory] = useState(""); // For category filtering
  const [selectedStockStatus, setSelectedStockStatus] = useState(""); // For stock status filtering
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [productsPerPage] = useState(10); // Number of products per page
  const apiUrl = import.meta.env.VITE_API_URL;

  const colorOptions = [
    { value: "Gray", label: "Gray" },
    { value: "Black", label: "Black" },
    { value: "White", label: "White" },
    { value: "Red", label: "Red" },
    { value: "Blue", label: "Blue" },
  ];

  const sizeOptions = [
    { value: "S", label: "Small" },
    { value: "M", label: "Medium" },
    { value: "L", label: "Large" },
    { value: "XL", label: "Extra Large" },
    { value: "2XL", label: "2XL" },
  ];

  const stockStatusOptions = [
    { value: "In Stock", label: "In Stock" },
    { value: "Out of Stock", label: "Out of Stock" },
  ];

  // Fetch all products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        const response = await axios.get(`${apiUrl}/api/products/all-products`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const categoryResponse = await axios.get(`${apiUrl}/api/categories/all-category`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProducts(response.data.products); // Set products state
        setFilteredProducts(response.data.products); // Set filtered products to the full product list initially
        setCategories(categoryResponse.data); // Set categories for dropdown
      } catch (error) {
        console.error("Error fetching products:", error.message);
        if (error.response?.status === 403) {
          alert("Unauthorized access. Please log in again.");
        }
      }
    };

    fetchProducts();
  }, []);

  // Delete product
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${apiUrl}/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(products.filter((product) => product._id !== id)); // Update products list
        setFilteredProducts(filteredProducts.filter((product) => product._id !== id));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error.message);
        alert("Error deleting product.");
      }
    }
  };

  // Open the modal for editing a product
  const openEditModal = (product) => {
    setEditProductData(product); // Set the product data to edit
    setImagePreviews(product.images.map((img) => ({ src: img }))); // Preview existing images
    setIsModalOpen(true); // Open modal
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditProductData(null); // Reset the edit data
    setImagePreviews([]); // Reset image previews
  };

  const handleMeasurementChange = (e, size, type) => {
    const value = e.target.value;
    // if measurements exist into the edit product than update measurement
    if (editProductData.measurements.length > 0) {
      const updatedMeasurements = editProductData?.measurements.map((measurement) => {
        return measurement.size === size ? { ...measurement, value: { ...measurement.value, [type]: value } } : measurement;
      });
      setEditProductData({ ...editProductData, measurements: updatedMeasurements });
    } else {
      // measurement doesnt exist so add new properties and update their value accordingly
      const countedMeasurement = editProductData.sizes.map((productSize) => ({ size: productSize, value: { [type]: size === productSize ? value : 0 } }));

      setEditProductData({ ...editProductData, measurements: countedMeasurement });
    }
  };

  console.log(editProductData);

  // Handle product update
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      for (const key in editProductData) {
        if (Array.isArray(editProductData[key])) {
          formData.append(key, JSON.stringify(editProductData[key]));
        } else {
          formData.append(key, editProductData[key]);
        }
      }

      // Add images from previews (if updated)
      imagePreviews.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file);
        }
      });

      await axios.put(`${apiUrl}/api/products/${editProductData._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProducts((prevProducts) => prevProducts.map((product) => (product._id === editProductData._id ? editProductData : product)));
      alert("Product updated successfully!");
      closeModal(); // Close the modal
    } catch (error) {
      console.error("Error updating product:", error.message);
      alert("Failed to update product");
    }
  };

  // Handle form input change for modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProductData({ ...editProductData, [name]: value });
  };

  // Handle category change
  const handleCategoryChange = (selectedCategory) => {
    setEditProductData({ ...editProductData, category: selectedCategory });
  };

  // Handle color and size selection
  const handleMultiSelectChange = (selectedOptions, field) => {
    const selectedValues = selectedOptions.map((option) => option.value);

    if (field === "sizes") {
      const updatedMeasurements = selectedValues.map((size) => {
        const existingMeasurement = editProductData?.measurements.find((measurement) => measurement.size == size);
        if (existingMeasurement) {
          return existingMeasurement;
        } else {
          return { size: size, value: { shoulder: 0, chest: 0 } };
        }
      });

      setEditProductData({ ...editProductData, [field]: selectedValues, measurements: updatedMeasurements });
    } else {
      setEditProductData({ ...editProductData, [field]: selectedValues });
    }
  };

  // Handle image preview and upload
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const previews = files.map((file) => ({
      src: URL.createObjectURL(file),
      file,
    }));
    setImagePreviews(previews);
  };

  // Handle search filtering
  useEffect(() => {
    let filtered = products;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Apply stock status filter
    if (selectedStockStatus) {
      filtered = filtered.filter((product) => product.stockStatus === selectedStockStatus);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedStockStatus, products]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pt-20 pb-5 px-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <Link to="/dashboard/products/add" className="text-white no-underline">
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            <FiPlus className="mr-2" />
            Add Product
          </button>
        </Link>
      </div>

      {/* Search and Filter Options */}
      <div className="flex justify-between mb-6">
        <input type="text" className="w-1/3 p-2 border border-gray-300 rounded" placeholder="Search by product name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select className="w-1/3 p-2 border border-gray-300 rounded" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Filter by Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <select className="w-1/3 p-2 border border-gray-300 rounded" value={selectedStockStatus} onChange={(e) => setSelectedStockStatus(e.target.value)}>
          <option value="">Filter by Stock Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {/* Products Table */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Stock Status</th>
            <th className="py-2 px-4 border">Quantity</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <tr key={product._id} className="text-center">
                <td className="py-2 px-4 border">{product.name}</td>
                <td className="py-2 px-4 border">${product.price}</td>
                <td className="py-2 px-4 border">{product.stockStatus}</td>
                <td className="py-2 px-4 border">{product.quantity}</td>
                <td className="py-2 px-4 border">
                  <button className="mr-2 bg-green-500 text-white p-2 rounded hover:bg-green-600" onClick={() => openEditModal(product)}>
                    <FiEdit />
                  </button>
                  <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600" onClick={() => deleteProduct(product._id)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 text-center">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from(
          {
            length: Math.ceil(filteredProducts.length / productsPerPage),
          },
          (_, index) => (
            <button key={index + 1} onClick={() => paginate(index + 1)} className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
              {index + 1}
            </button>
          )
        )}
      </div>

      {/* Modal for Editing Product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl mx-auto overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleUpdateProduct} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" value={editProductData.name} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" value={editProductData.description} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" name="price" value={editProductData.price} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Original Price</label>
                <input type="number" name="originalPrice" value={editProductData.originalPrice} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Stock Status</label>
                <select name="stockStatus" value={editProductData.stockStatus} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded">
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Discount</label>
                <input type="number" name="discount" value={editProductData.discount} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input type="number" name="quantity" value={editProductData.quantity} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" required />
              </div>

              {/* Colors Multi-select */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Colors</label>
                <Select
                  options={colorOptions}
                  isMulti
                  value={colorOptions.filter((option) => editProductData.colors.includes(option.value))}
                  onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, "colors")}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>

              {/* Sizes Multi-select */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Sizes</label>
                <Select
                  options={sizeOptions}
                  isMulti
                  value={sizeOptions.filter((option) => editProductData.sizes.includes(option.value))}
                  onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, "sizes")}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>

              {editProductData?.sizes.length > 0 && (
                <div className="mb-6 flex flex-col gap-2">
                  <h5>Add measurment for the selected sizes</h5>
                  {editProductData.sizes?.map((size) => {
                    const selectedSize = sizeOptions?.find((sizeOption) => sizeOption.value == size);
                    const selectedMeasurements = editProductData?.measurements.find((meas) => meas.size == size);
                    return (
                      <div key={size} className="flex gap-4 items-center">
                        <span className="w-[100px] text-black font-medium ">{selectedSize?.label}</span>
                        <div className="flex gap-12">
                          <div className="flex items-center gap-2">
                            <input
                              onChange={(e) => handleMeasurementChange(e, size, "shoulder")}
                              required
                              value={selectedMeasurements?.value.shoulder || 0}
                              className="border p-3 w-32 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              type="number"
                              placeholder="Shoulder"
                            />
                            <span>Inch</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              onChange={(e) => handleMeasurementChange(e, size, "chest")}
                              required
                              value={selectedMeasurements?.value.chest || 0}
                              className="border p-3 w-32 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              type="number"
                              placeholder="Chest"
                            />
                            <span>Inch</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Category Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select name="category" value={editProductData.category} onChange={(e) => handleCategoryChange(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Subcategory</label>
                <input type="text" name="subcategory" value={editProductData.subcategory} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded" />
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Product Images (Max 5)</label>
                <input type="file" multiple onChange={handleFileChange} />
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img loading="lazy" src={apiUrl + "/" + preview.src} alt="Preview" className="h-32 w-32 object-cover rounded-md" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-6">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
