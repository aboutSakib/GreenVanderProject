import axios from "axios"; // Import axios
import React, { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const Sidebar = ({
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  selectedPrice,
  setSelectedPrice,
  selectedCategories = [], // Ensure this defaults to an empty array
  setSelectedCategories,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [categories, setCategories] = useState([]); // State for categories
  const [loading, setLoading] = useState(true); // Loading state
  const [subcategories, setSubcategories] = useState({}); // State for subcategories
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/categories/all-category`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array to run once on component mount

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  const handleCategoryToggle = async (categoryId) => {
    // Update selectedCategories state safely
    const newSelectedCategories = Array.isArray(selectedCategories)
      ? selectedCategories.includes(categoryId)
        ? selectedCategories.filter((id) => id !== categoryId)
        : [...selectedCategories, categoryId]
      : [categoryId]; // Default to an array if it's null or not an array

    setSelectedCategories(newSelectedCategories);

    // Fetch subcategories if category is added
    if (!newSelectedCategories.includes(categoryId)) {
      const fetchedSubcategories = await fetchSubcategories(categoryId);
      setSubcategories((prevSubcategories) => ({
        ...prevSubcategories,
        [categoryId]: fetchedSubcategories,
      }));
    } else {
      // Clear subcategories if category is removed
      setSubcategories((prevSubcategories) => {
        const newSubcategories = { ...prevSubcategories };
        delete newSubcategories[categoryId];
        return newSubcategories;
      });
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/categories/${categoryId}/subcategories`
      );

      return response.data; // Adjust based on your actual API response
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      return [];
    }
  };

  const handleCheckboxChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      // Remove category from selection
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      // Add category to selection
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
  const handleClearCategories = () => {
    setSelectedCategories([]);
    setSubcategories({});
  };

  const handleClearPrice = () => {
    setSelectedPrice(null); // Clear selected price range
  };

  const handleClearSize = () => {
    setSelectedSize(null);
  };

  const handleClearColor = () => {
    setSelectedColor(null);
  };

  return (
    <>
      {/* Large Device Filter Section */}
      <div className="hidden lg:block w-1/4 bg-white p-4 shadow-md">
        {/* Category Section */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg flex justify-between">
            -- Category{" "}
            <span
              className="text-sm text-gray-400 cursor-pointer"
              onClick={handleClearCategories}
            >
              Clear
            </span>
          </h3>
          <hr className="w[80%]" />

          <div className="mb-4">
            <ul className="space-y-2 mt-2">
              {loading ? (
                <p>Loading categories...</p>
              ) : (
                categories.map((category) => (
                  <li key={category._id} className="pl-4">
                    <input
                      type="checkbox"
                      checked={
                        Array.isArray(selectedCategories) &&
                        selectedCategories.includes(category._id)
                      } // Check if this category is selected
                      onChange={() => handleCategoryToggle(category._id)} // Toggle category
                    />{" "}
                    {category.name}
                    {/* Render subcategories if any */}
                    {subcategories[category._id]?.map((subcategory) => (
                      <ul key={subcategory._id} className="ml-6 mt-1">
                        <li>
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category._id)}
                            onChange={() => handleCheckboxChange(category._id)}
                          />{" "}
                          {subcategory.name}
                        </li>
                      </ul>
                    ))}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg flex justify-between">
            -- Price{" "}
            <span
              className="text-sm text-gray-400 cursor-pointer"
              onClick={handleClearPrice}
            >
              Clear
            </span>
          </h3>
          <hr className="w[80%]" />
          <ul className="space-y-2 mt-2">
            {[
              { range: "400-999 Tk", value: "400-999" },
              { range: "1000-1499 Tk", value: "1000-1499" },
              { range: "1500-1999 Tk", value: "1500-1999" },
              { range: "2000-2999 Tk", value: "2000-2999" },
              { range: "3000-4999 Tk", value: "3000-4999" },
            ].map((price) => (
              <li key={price.value}>
                {selectedPrice === price.value ? (
                  <p
                    className="font-medium cursor-pointer"
                    onClick={() => setSelectedPrice(price.value)}
                  >
                    {price.range}
                  </p>
                ) : (
                  <p
                    className="font-normal cursor-pointer"
                    onClick={() => setSelectedPrice(price.value)}
                  >
                    {price.range}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Small Device Sort Dropdown */}
      <div className="flex">
        <div className="block lg:hidden px-4">
          <button onClick={toggleDrawer}>
            <BiMenu className="text-3xl border rounded-md my-1" />
          </button>
          <Drawer open={isDrawerOpen} onClose={toggleDrawer} direction="right">
            <div className="bg-white p-4 max-h-[100vh] overflow-y-auto">
              {/* Category Section */}
              <div className="mb-4">
                <h3 className="font-semibold flex justify-between text-lg">
                  Category{" "}
                  <span
                    className="text-sm text-gray-400 cursor-pointer"
                    onClick={handleClearCategories}
                  >
                    Clear
                  </span>
                </h3>
                {loading ? (
                  <p>Loading categories...</p>
                ) : (
                  <ul className="space-y-2 mt-2">
                    {categories.map((category) => (
                      <li key={category._id} className="pl-4">
                        <input
                          type="checkbox"
                          checked={
                            Array.isArray(selectedCategories) &&
                            selectedCategories.includes(category._id)
                          } // Check if this category is selected
                          onChange={() => handleCategoryToggle(category._id)} // Toggle category
                        />{" "}
                        {category.name}
                        {/* Render subcategories if any */}
                        {subcategories[category._id]?.map((subcategory) => (
                          <ul key={subcategory._id} className="ml-6 mt-1">
                            <li>
                              <input
                                type="checkbox"
                                checked={
                                  Array.isArray(selectedCategories) &&
                                  selectedCategories.includes(subcategory._id)
                                } // Check if this subcategory is selected
                                onChange={() =>
                                  handleCategoryToggle(subcategory._id)
                                } // Toggle subcategory
                              />{" "}
                              {subcategory.name}
                            </li>
                          </ul>
                        ))}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Price Section */}
              <div className="mb-4">
                <h3 className="font-semibold text-lg flex justify-between">
                  Price{" "}
                  <span
                    className="text-sm text-gray-400 flex justify-between cursor-pointer"
                    onClick={handleClearPrice}
                  >
                    Clear
                  </span>
                </h3>
                <ul className="space-y-2 mt-2">
                  {[
                    { range: "400-999 Tk", value: "400-999" },
                    { range: "1000-1499 Tk", value: "1000-1499" },
                    { range: "1500-1999 Tk", value: "1500-1999" },
                    { range: "2000-2999 Tk", value: "2000-2999" },
                    { range: "3000-4999 Tk", value: "3000-4999" },
                  ].map((price) => (
                    <li key={price.value}>
                      <input
                        type="radio"
                        name="price"
                        value={price.value}
                        checked={selectedPrice === price.value} // Check if this price range is selected
                        onChange={() => setSelectedPrice(price.value)} // Handle radio change
                      />{" "}
                      {price.range}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Section */}
              <div className="mb-4">
                <h3 className="font-semibold flex justify-between text-lg">
                  Size{" "}
                  <span
                    className="text-sm text-gray-400 flex justify-between cursor-pointer"
                    onClick={handleClearSize}
                  >
                    Clear
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["S", "M", "L", "XL", "2XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Section */}
              <div className="mb-4">
                <h3 className="font-semibold flex justify-between text-lg">
                  Color{" "}
                  <span
                    className="text-sm text-gray-400  cursor-pointer"
                    onClick={handleClearColor}
                  >
                    Clear
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Yellow", "Red", "Blue", "Green", "Black", "White"].map(
                    (color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-full border ${
                          selectedColor === color
                            ? "bg-red-500 text-white"
                            : "bg-gray-200"
                        }`}
                        style={{
                          backgroundColor:
                            selectedColor === color
                              ? color.toLowerCase()
                              : "transparent",
                        }}
                      >
                        {color}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
