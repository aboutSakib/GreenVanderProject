import { useState } from "react";
import { Link } from "react-router-dom";
import FlashSaleTimer from "../../home/components/FlashSale/FlashSaleTimer";
import image from "../../Images/logo/⚡️.png";
const FlashSaleHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Best Match");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectSort = (option) => {
    setSelectedSort(option);
    setIsOpen(false);
  };
  return (
    <div className="bg-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Breadcrumb */}
        <div className="text-gray-500 text-base">
          <Link to="/">Home</Link> /{" "}
          <span className="text-black font-semibold">Flash Sale</span>
        </div>

        {/* Sort Dropdown */}
        <div className="lg:block hidden">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">Sort by:</span>
            <button
              onClick={toggleDropdown}
              className="flex justify-between items-center w-2/3 md:w-auto px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {selectedSort}
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>

          {isOpen && (
            <div className="absolute mt-2 w-auto bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <ul className="text-sm text-gray-700">
                {[
                  "Best Match",
                  "Price: Low to High",
                  "Price: High to Low",
                  "Newest",
                ].map((option) => (
                  <li key={option}>
                    <button
                      onClick={() => handleSelectSort(option)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="container mx-auto mt-4 flex  ">
        <h2 className="text-3xl font-bold">Flash Sale</h2>
        <img loading="lazy" src={image} alt="" className="w-9" />
      </div>
      <div className="flex justify-center bg-gray-50 py-5">
        <h2 className="text-base text-[#475467] text-right px-2 ">Ends In</h2>
        <FlashSaleTimer />
      </div>
    </div>
  );
};

export default FlashSaleHeader;
