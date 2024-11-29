import { useState } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../../shared/Sidebar";
import FlashSaleGrid from "./flashSaleGrid";
import FlashSaleHeader from "./flashSaleHeader";

const FlashSaleProducts = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedSort, setSelectedSort] = useState("Best Match");
  return (
    <>
      <Helmet>
        <title>Flash Sale | Greenvandar</title>
      </Helmet>
      <div>
        <FlashSaleHeader />
        <div className="container lg:mx-auto xl:mx-auto md:mx-auto lg:flex w-full">
          <Sidebar
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
          <div className="lg:w-3/4 md:w-full xl:full p-4">
            <h2 className="text-2xl font-bold mb-4">Flash Sale</h2>
            <FlashSaleGrid
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              selectedSort={selectedSort}
              selectedCategories={selectedCategories}
              selectedPrice={selectedPrice}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FlashSaleProducts;
