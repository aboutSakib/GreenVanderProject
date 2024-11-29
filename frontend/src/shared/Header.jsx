import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { RotatingLines } from "react-loader-spinner";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Link } from "react-router-dom"; // Import useNavigate
import ProductSearch from "../Components/ProductSearch";
import logo from "../Images/logo/logo.jpg";
import ProfileMenu from "../Page/dashboard/components/common/ProfileMenu";
import { UserContext } from "../Page/dashboard/hook/UserContext";
import { useCart } from "../contexts/useContext";

const Header = () => {
  const { user, loading } = useContext(UserContext);
  const { cart, loading: cartLoading } = useCart();
  const [categories, setCategories] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      // refetch();
      try {
        const response = await axios.get(
          `${apiUrl}/api/categories/all-category`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Toggle the drawer menu
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  // Handle subcategory toggle
  const handleSubcategoryToggle = (categoryName) => {
    setOpenSubcategory(openSubcategory === categoryName ? null : categoryName);
  };

  // Handle cart click
  // const handleCartClick = () => {
  //   if (!user) {
  //     Swal.fire({
  //       title: "Login Required",
  //       text: "You need to log in to access the cart.",
  //       icon: "warning",
  //       confirmButtonText: "Go to Login",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         navigate("/login"); // Redirect to login if user confirms
  //       }
  //     });
  //   }
  // };

  return (
    <header className="bg-[#00241a]  py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
        {/* Left - Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-white">
          <Link to="/products">পণ্যসমূহ</Link>
          {categories.map((category) => (
            <div key={category._id} className="relative">
              <button
                onClick={() => handleSubcategoryToggle(category.name)}
                className="text-white hover:-[#84D814]"
              >
                {category.name}
              </button>
              {openSubcategory === category.name && (
                <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory}
                      to={`/category/${category._id}/subcategory/${subcategory}`} // Updated link
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setOpenSubcategory(null)} // Close dropdown on selection
                    >
                      {subcategory}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu - Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleDrawer}
            className="text-gray-600 focus:outline-none"
            aria-label="Toggle drawer"
          >
            {isDrawerOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Drawer */}
        <Drawer open={isDrawerOpen} onClose={toggleDrawer} direction="right">
          <div className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 p-4 h-full flex flex-col shadow-lg transition-transform duration-300 ease-out">
            <div className="flex justify-between items-center mb-4">
              <img
                loading="lazy"
                src={logo}
                alt="FabriO Logo"
                className="h-10"
              />
              <button
                onClick={toggleDrawer}
                className="text-gray-600 hover:text-red-500 transition-colors duration-300"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <h1 className="text-xl font-semibold text-white mb-2">
              Categories
            </h1>
            <hr className="border-gray-300 mb-4" />

            <div className="flex-1 overflow-y-auto space-y-3">
              <div>
                <Link
                  className="flex items-center gap-3 text-gray-700 hover:text-red-500 font-medium text-lg transition-transform duration-200 transform hover:scale-105"
                  to="/products"
                >
                  <FaBars /> Products
                </Link>
              </div>
              {categories.map((category) => (
                <div key={category._id} className="relative">
                  <button
                    onClick={() => handleSubcategoryToggle(category.name)}
                    className="flex items-center gap-3 text-gray-700 hover:text-red-500 font-medium text-lg transition-transform duration-200 transform hover:scale-105"
                  >
                    <span className="text-red-500">
                      <FaBars />{" "}
                      {/* Replace with category-specific icons if available */}
                    </span>
                    {category.name}
                  </button>
                  {openSubcategory === category.name && (
                    <div className="mt-2 pl-6 space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory}
                          to={`/category/${category._id}/subcategory/${subcategory}`}
                          className="block px-4 py-2 text-gray-600 hover:bg-red-100 hover:text-red-500 rounded transition duration-200"
                          onClick={() => setOpenSubcategory(null)}
                        >
                          {subcategory}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-auto pt-4 border-t border-gray-300">
              <p className="text-center text-sm text-gray-500">
                &copy; 2024 Greenvander
              </p>
            </div>
          </div>
        </Drawer>

        {/* Center - Logo */}
        <div className="flex items-center justify-center">
          <Link to="/">
            <img
              loading="lazy"
              src={logo}
              alt="FabriO Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Right - Search Bar and Cart Icon */}
        <div className="flex items-center space-x-4">
          <ProductSearch />

          <div className="relative flex items-center">
            <Link to={"/cart"}>
              {/* <button onClick={handleCartClick}> */}
              <PiShoppingCartSimpleLight
                className="text-gray-600 hover:text-black sm:text-4xl text-3xl"
                aria-label="Cart"
              />
              {/* </button> */}
            </Link>
            <span className="">
              {cartLoading ? (
                <>loading</>
              ) : (
                <span className="absolute top-0 left-3 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  +{cart?.length || 0}
                </span>
              )}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-4 flex-shrink-0">
              {loading ? (
                <RotatingLines
                  visible={true}
                  height="16"
                  width="16"
                  color="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
              ) : user ? (
                <ProfileMenu />
              ) : (
                <Link to="/login">
                  <button className="self-center px-5 py-2 font-semibold text-black hover:text-white bg-[#ffffff] rounded-full shadow hover:bg-[#f15959] transition-colors duration-400 hover:border-[#5996dd] border-gray-400 border mr-4">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
