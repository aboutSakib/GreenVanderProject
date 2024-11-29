import axios from "axios";
import { useEffect, useState } from "react";

const SupplierForm = ({ onSave, supplierToEdit, closeModal }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    productsSupplied: [{ productName: "", quantity: 0 }],
  });

  useEffect(() => {
    if (supplierToEdit) {
      setFormData(supplierToEdit);
    } else {
      setFormData({
        name: "",
        contactEmail: "",
        contactPhone: "",
        address: "",
        productsSupplied: [{ productName: "", quantity: 0 }],
      });
    }
  }, [supplierToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...formData.productsSupplied];
    updatedProducts[index][field] = value;
    setFormData({ ...formData, productsSupplied: updatedProducts });
  };

  const addProductField = () => {
    setFormData({
      ...formData,
      productsSupplied: [
        ...formData.productsSupplied,
        { productName: "", quantity: 0 },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (supplierToEdit) {
        await axios.put(
          `${apiUrl}/api/suppliers/update-supplier/${supplierToEdit._id}`,
          formData
        );
      } else {
        await axios.post(
          `${apiUrl}/api/suppliers/add-supplier`,
          formData
        );
      }
      onSave();
      setFormData({
        name: "",
        contactEmail: "",
        contactPhone: "",
        address: "",
        productsSupplied: [{ productName: "", quantity: 0 }],
      });
    } catch (error) {
      console.error("Error saving supplier:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <div className="col-span-1">
          <label className="block">Name:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="col-span-1">
          <label className="block">Email:</label>
          <input
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <div className="col-span-1">
          <label className="block">Phone:</label>
          <input
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="col-span-1">
          <label className="block">Address:</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          />
        </div>
      </div>
      {formData.productsSupplied.map((product, index) => (
        <div key={index} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block">Product Name:</label>
            <input
              name="productName"
              value={product.productName}
              onChange={(e) =>
                handleProductChange(index, "productName", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div>
            <label className="block">Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={(e) =>
                handleProductChange(index, "quantity", e.target.value)
              }
              className="border rounded w-full p-2"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addProductField}
        className="bg-gray-500 text-white p-2  rounded"
      >
        Add Another Product
      </button>
      <button
        className="bg-blue-500 text-white p-2 rounded w-full mx-4 md:w-auto"
        type="submit"
      >
        {supplierToEdit ? "Update Supplier" : "Add Supplier"}
      </button>
    </form>
  );
};

export default SupplierForm;
