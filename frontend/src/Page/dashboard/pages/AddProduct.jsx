/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BiImageAdd, BiX } from "react-icons/bi"; // Added BiX for the cross icon
import Select from "react-select"; // Import react-select for multi-select dropdowns

const colorOptions = [
  { value: "gray", label: "Gray" },
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "yellow", label: "Hard Yellow" },
  { value: "green", label: "Green" },
  { value: "purple", label: "Purple" },
  { value: "pink", label: "Pink" },
  { value: "indigo", label: "Indigo" },
  { value: "teal", label: "Teal" },
  { value: "orange", label: "Orange" },
  { value: "lime", label: "Lime" },
  { value: "amber", label: "Amber" },
  { value: "cyan", label: "Cyan" },
  { value: "emerald", label: "Emerald" },
  { value: "fuchsia", label: "Fuchsia" },
  { value: "rose", label: "Rose" },
  { value: "violet", label: "Violet" },
  { value: "sky", label: "Sky" },
  { value: "stone", label: "Stone" },
  { value: "neutral", label: "Neutral" },
  { value: "slate", label: "Slate" },
  { value: "zinc", label: "Zinc" },
  { value: "deep rose", label: "Deep Rose" },
  { value: "deep pink", label: "Deep Pink" },
  { value: "deep purple", label: "Deep Purple" },
  { value: "deep indigo", label: "Deep Indigo" },
  { value: "deep blue", label: "Deep Blue" },
  { value: "deep green", label: "Deep Green" },
];

const sizeOptions = [
  { value: "S", label: "Small" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Large" },
  { value: "XL", label: "Extra Large" },
  { value: "2XL", label: "2XL" },
];

// Stock Status Options
const stockStatusOptions = [
  { value: "In Stock", label: "In Stock" },
  { value: "Out of Stock", label: "Out of Stock" },
];

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    stockStatus: "In Stock", // Provide default value
    discount: "",
    quantity: "", // Add quantity field
    colors: [],
    sizes: [],
    category: "",
    subcategory: "",
    images: [],
    sku: "",
    measurements: [],
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [images, setImages] = useState([]); // To handle additional image uploads
  const [imagePreviews, setImagePreviews] = useState([]); // Previews for selected images
  const apiUrl = import.meta.env.VITE_API_URL;


  const handleMeasurementChange = (e, size, type) => {
    const value = e.target.value;
    const updatedMeasurements = formData.measurements.map((measurement) => {
      return measurement.size === size ? { ...measurement, value: { ...measurement.value, [type]: value } } : measurement;
    });
    setFormData({ ...formData, measurements: updatedMeasurements });
  };

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }
        const response = await axios.get(`${apiUrl}/api/categories/all-category`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        if (error.response && error.response.status === 401) {
          alert("Unauthorized. Please log in again.");
        }
      }
    };

    fetchCategories();
  }, []);

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle category selection
  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = categories.find((cat) => cat._id === selectedCategoryId);
    setFormData({ ...formData, category: selectedCategoryId });
    setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
  };

  // Handle color selection
  const handleColorChange = (selectedOptions) => {
    const selectedColors = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, colors: selectedColors });
  };

  // Handle size selection
  const handleSizeChange = (selectedOptions) => {
    const selectedSizes = selectedOptions.map((option) => option.value);
    setSelectedSizes(selectedSizes);

    const newMeasurement = selectedSizes.map((size) => {
      const existingMeasurement = formData.measurements.find((m) => m.size === size);
      return existingMeasurement || { size, value: { shoulder: 0, chest: 0 } };
    });

    setFormData({ ...formData, measurements: newMeasurement, sizes: selectedSizes });
  };

  // Handle stock status selection
  const handleStockStatusChange = (selectedOption) => {
    setFormData({ ...formData, stockStatus: selectedOption.value });
  };

  // Handle file drop (drag and drop)
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length + images.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }
    setImages([...images, ...acceptedFiles]);
    const previews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
    maxFiles: 5,
  });

  // Remove image handler
  const removeImage = (index) => {
    const newImages = [...images];
    const newImagePreviews = [...imagePreviews];
    newImages.splice(index, 1);
    newImagePreviews.splice(index, 1);
    setImages(newImages);
    setImagePreviews(newImagePreviews);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    const formDataObj = new FormData();

    // Populate the FormData with the form fields
    formDataObj.append("name", formData.name);
    formDataObj.append("description", formData.description);
    formDataObj.append("price", formData.price);
    formDataObj.append("originalPrice", formData.originalPrice);
    formDataObj.append("stockStatus", formData.stockStatus); // Ensure this is added
    formDataObj.append("quantity", formData.quantity); // Ensure this is added
    formDataObj.append("discount", formData.discount);
    formDataObj.append("category", formData.category);
    formDataObj.append("subcategory", formData.subcategory);
    formDataObj.append("sku", formData.sku);
    formDataObj.append("measurements", JSON.stringify(formData.measurements));

    // Add colors and sizes as JSON strings (if they are arrays)
    formDataObj.append("colors", JSON.stringify(formData.colors));
    formDataObj.append("sizes", JSON.stringify(formData.sizes));

    // Add images if any
    images.forEach((image) => formDataObj.append("images", image));

    try {
      const response = await axios.post(`${apiUrl}/api/products/create-product`, formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product added successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        stockStatus: "In Stock", // Reset stockStatus
        quantity: "", // Reset quantity
        discount: "",
        colors: [],
        sizes: [],
        category: "",
        subcategory: "",
        images: [],
      });
      setImages([]);
      setImagePreviews([]);
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.response.data.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="py-20 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product SKU</label>
            <input type="text" name="sku" value={formData.sku} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Product Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"></textarea>
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange} // Trigger subcategory update on category change
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="" disabled>
                Select a category
              </option>
              {categories.length > 0 ? (
                categories.map(({ _id, name }) => (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                ))
              ) : (
                <option disabled>Loading categories...</option>
              )}
            </select>
          </div>

          {/* Subcategory Selection */}
          {subcategories.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
              <select name="subcategory" value={formData.subcategory} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="" disabled>
                  Select a subcategory
                </option>
                {subcategories.map((subcategory, index) => (
                  <option key={index} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Price and Original Price */}
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Discount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
            <input type="number" name="discount" value={formData.discount} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock Status</label>
            <Select
              options={stockStatusOptions}
              value={stockStatusOptions.find((option) => option.value === formData.stockStatus)}
              onChange={handleStockStatusChange}
              className="basic-single-select"
              classNamePrefix="select"
            />
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Colors Multi-select */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
            <Select options={colorOptions} isMulti value={colorOptions.filter((option) => formData.colors.includes(option.value))} onChange={handleColorChange} className="basic-multi-select" classNamePrefix="select" />
          </div>

          {/* Sizes Multi-select */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
            <Select options={sizeOptions} isMulti value={sizeOptions.filter((option) => formData.sizes.includes(option.value))} onChange={handleSizeChange} className="basic-multi-select" classNamePrefix="select" />
          </div>

          {selectedSizes.length > 0 && (
            <div className="mb-6 flex flex-col gap-2">
              <h5>Add measurment for the selected sizes</h5>
              {selectedSizes?.map((size) => {
                const sizeLabel = sizeOptions.find((sizeOption) => sizeOption.value == size).label;
                return (
                  <div key={size} className="flex gap-4 items-center">
                    <span className="w-[100px] text-black font-medium ">{sizeLabel}</span>
                    <div className="flex gap-12">
                      <div className="flex items-center gap-2">
                        <input
                          onChange={(e) => handleMeasurementChange(e, size, "shoulder")}
                          required
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
          
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images (Max 5)</label>
            <div
              {...getRootProps({
                className: "border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer hover:border-blue-500 focus:outline-none",
              })}>
              <input {...getInputProps()} />
              <BiImageAdd className="mx-auto text-4xl text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Drag & drop images here, or click to select files</p>
            </div>
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4 relative">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img loading="lazy" src={preview} alt="preview" className="h-32 w-32 object-cover rounded-md" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 hover:bg-red-800">
                      <BiX size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
