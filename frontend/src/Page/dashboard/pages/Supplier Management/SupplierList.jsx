import React, { useState, useEffect } from "react";

const SupplierList = ({ suppliers, onEdit, onDelete }) => {
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);
  const [currentPage, setCurrentPage] = useState(1);
  const [suppliersPerPage] = useState(10);
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    const filterSuppliers = () => {
      const lowercasedFilter = filterTerm.toLowerCase();
      const filtered = suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(lowercasedFilter) ||
        supplier.contactEmail.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredSuppliers(filtered);
    };
    filterSuppliers();
  }, [filterTerm, suppliers]);

  // Pagination logic
  const indexOfLastSupplier = currentPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = filteredSuppliers.slice(indexOfFirstSupplier, indexOfLastSupplier);

  const totalPages = Math.ceil(filteredSuppliers.length / suppliersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mt-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Suppliers</h2>

        {/* Filter input */}
        <input
          type="text"
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          placeholder="Filter suppliers by name or email"
          className="border border-gray-300 rounded p-2 w-full md:w-1/2"
        />
      </div>

      {/* Supplier List */}
      <ul>
        {currentSuppliers.map((supplier) => (
          <li key={supplier._id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-100 mb-2 rounded shadow-lg">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-gray-700">{supplier.name}</h3>
              <p className="text-gray-500">{supplier.contactEmail}</p>
              <p className="text-gray-500">{supplier.contactPhone}</p>
              <p className="text-gray-500">{supplier.address}</p>
              <ul className="mt-2">
                {supplier.productsSupplied.map((product, idx) => (
                  <li key={idx} className="text-gray-700">
                    {product.productName} - <span className="font-semibold">{product.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition"
                onClick={() => onEdit(supplier)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                onClick={() => onDelete(supplier._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`bg-gray-300 text-gray-700 px-4 py-2 rounded ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          className={`bg-gray-300 text-gray-700 px-4 py-2 rounded ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SupplierList;
