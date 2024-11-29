import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import SupplierForm from "./SupplierForm";
import SupplierList from "./SupplierList";

const SupplierManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supplierToEdit, setSupplierToEdit] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch suppliers function
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/suppliers/all-suppliers`
      );
      setSuppliers(response.data); // Update state with fetched suppliers
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  useEffect(() => {
    fetchSuppliers(); // Fetch suppliers on initial render
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSupplierToEdit(null); // Reset form on modal close
  };

  const handleSave = () => {
    fetchSuppliers(); // Refresh supplier list after save
    closeModal();
  };

  const handleEdit = (supplier) => {
    setSupplierToEdit(supplier);
    openModal();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${apiUrl}/api/suppliers/delete-supplier/${id}`
      );
      fetchSuppliers(); // Refresh supplier list after deletion
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center mt-8">
        Supplier Management
      </h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={openModal}
          className="bg-green-500 text-white p-3 rounded"
        >
          Add Supplier
        </button>
      </div>

      <SupplierList
        suppliers={suppliers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Panel className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <Dialog.Title className="text-2xl mb-4">
              {supplierToEdit ? "Edit Supplier" : "Add Supplier"}
            </Dialog.Title>
            <SupplierForm
              onSave={handleSave}
              supplierToEdit={supplierToEdit}
              closeModal={closeModal}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default SupplierManagement;
