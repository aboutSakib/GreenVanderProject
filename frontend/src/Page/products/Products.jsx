import { useState } from "react";
import { Helmet } from "react-helmet";
import Sidebar from "../../shared/Sidebar";
import CollectionHeader from "./CollectionHeader";
import ProductGrid from "./ProductGrid";

const Products = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedSort, setSelectedSort] = useState("Best Match");

  return (
    <>
      <Helmet>
        <title>All Products | GreenVander</title>
      </Helmet>
      <div className="bg-[#e1f3f2]">
        <CollectionHeader />
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
            <h2 className="text-2xl font-bold mb-4 text-black">
              আমাদের পণ্যসমূহ
            </h2>
            <ProductGrid
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

export default Products;
