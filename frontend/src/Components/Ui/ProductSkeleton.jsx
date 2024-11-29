import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="p-4 w-full max-w-[300px] mx-auto bg-white rounded-lg border border-gray-200  animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-md"></div>
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="mt-4 h-8 bg-gray-200 rounded-md w-1/2"></div>
    </div>
  );
};

export default ProductSkeleton;
