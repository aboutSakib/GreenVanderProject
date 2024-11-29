import React from "react";

import logo from "../../../Images/logo/logo.jpg"; // Import your logo image

const FabrioBanner = () => {
  return (
    <div>
      <div>
        <div className="absolute inset-0 bg-white bg-opacity-15 flex flex-col justify-center items-center text-center p-6 rounded-lg">
          <img
            loading="lazy"
            src={logo}
            alt="Fabrio Logo"
            className="h-12 mb-4"
          />{" "}
          {/* Use the imported logo */}
          <p className="text-gray-700 font-semibold text-lg">
            Quality, style, sustainability. Modern, comfortable, timeless
            apparel. Eco-friendly, ethical, trendy, responsible production.
          </p>
          <p className="text-gray-500 font-medium mt-2">Look good, do good.</p>
        </div>
      </div>
    </div>
  );
};

export default FabrioBanner;
