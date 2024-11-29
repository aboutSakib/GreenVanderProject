import { Helmet } from "react-helmet";
import { useState } from "react";
import Sidebar from "../../shared/Sidebar";
import CategoryPage from "./CategoryPage";

const CategoryProduct = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedSort, setSelectedSort] = useState("Best Match");
  return (
    <>
      <Helmet>
        <title>Products | Greenvandar</title>
      </Helmet>
      <div>
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
            <CategoryPage
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

export default CategoryProduct;
