import React from "react";

const Container = ({ children }) => {
  return (
    <div className="xl:px-10 md:px-20 sm:px-30 px-4 xl:py-8 md:py-2 sm:py-1 py-6">
      {children}
    </div>
  );
};

export default Container;
