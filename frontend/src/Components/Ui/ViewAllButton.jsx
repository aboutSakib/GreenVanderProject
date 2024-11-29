import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ViewAllButton({ to, classNames = "", ...rest }) {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-6 py-2 rounded-full border border-gray-300 bg-white transition-colors hover:bg-green-700 hover:border-green-700 ${classNames}`}
      {...rest}
    >
      <span className="text-green-700 font-medium hover:text-white">
        সব দেখুন
      </span>
      <div
        className="flex items-center justify-center w-8 h-8 rounded-full
      bg-[#84d814]  hover:bg-white transition-colors"
      >
        <FaArrowRight className="text-green-700 hover:text-green-500" />
      </div>
    </Link>
  );
}
