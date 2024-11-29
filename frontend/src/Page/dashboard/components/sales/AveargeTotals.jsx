import React from "react";
import CircularBar from "./CircularBar";
import { FiInfo } from "react-icons/fi";

const AverageTotals = () => {
  return (
    <div className="p-4 rounded-lg border border-gray-200 shadow-sm h-full">
      <h2 className="text-lg font-semibold">Average Total Sales</h2>
      <p className="text-sm text-gray-500">2022-2023</p>

      <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-6 mt-4 mb-4">
        {/* Cases */}
        <div className="flex items-center gap-4">
          <CircularBar percentage={46} pathColor="#99d1a6" />
          <div>
            <h3 className="text-base font-medium">92,980</h3>
            <p className="text-sm text-gray-500">Cases</p>
          </div>
        </div>

        {/* Applications */}
        <div className="flex items-center gap-4">
          <CircularBar percentage={74} pathColor="#a288ec" />
          <div>
            <h3 className="text-base font-medium">23,980</h3>
            <p className="text-sm text-gray-500">Applications</p>
          </div>
        </div>

        {/* Products */}
        <div className="flex items-center gap-4">
          <CircularBar percentage={14} pathColor="#fc424a" />
          <div>
            <h3 className="text-base font-medium">14,980</h3>
            <p className="text-sm text-gray-500">Products</p>
          </div>
        </div>
      </div>

      <hr />

      <div className="flex items-start gap-4 pt-4">
        <FiInfo className="text-gray-600" />
        <p className="text-sm text-gray-600">
          Note: Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          aliquam quos minima, aperiam iste doloremque quis reprehenderit ad
          placeat beatae veniam natus tempore quod a?
        </p>
      </div>
    </div>
  );
};

export default AverageTotals;
