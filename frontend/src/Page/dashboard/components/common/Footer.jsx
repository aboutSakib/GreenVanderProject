
import React from "react";

const Footer = () => {
  return (
    <div className="shadow-none rounded-lg border border-gray-200 py-2 mb-5 text-center">
    <p className="text-gray-700">
      Created by <span className="text-blue-600">Fabrico Development Team</span> | All Rights Reserved &copy; {new Date().getFullYear()}
    </p>
  </div>
  );
};

export default Footer;
