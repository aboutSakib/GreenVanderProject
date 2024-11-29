const CollectionHeader = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedSort, setSelectedSort] = useState("Best Match");

  // const toggleDropdown = () => setIsOpen(!isOpen);

  // const handleSelectSort = (option) => {
  //   setSelectedSort(option);
  //   setIsOpen(false);
  // };
  return (
    <div className=" py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Breadcrumb */}
        <div className="text-gray-500 text-sm">
          <span>Home</span> /{" "}
          <span className=" font-semibold text-black">আমাদের সমস্ত পণ্য</span>
        </div>

        {/* Sort Dropdown */}
        <div className="lg:block hidden">
          {/* <div className="flex items-center space-x-2">
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
          </div> */}

          {/* {isOpen && (
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
          )} */}
        </div>
      </div>

      {/* Title */}
      <div className="container mx-auto mt-4">
        <h2 className="text-black text-3xl font-bold">আমাদের সংগ্রহ</h2>
      </div>
    </div>
  );
};

export default CollectionHeader;
