import axios from "axios";
import React, { useEffect, useState } from "react";

const FlashSale = () => {
  const [offers, setOffers] = useState([]);
  const [flashSaleTime, setFlashSaleTime] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [newOffer, setNewOffer] = useState({
    type: "",
    title: "",
    details: "",
    discountPrice: 0,
    freeDelivery: false,
  });

  const [editingOffer, setEditingOffer] = useState(null);

  // Fetch offers on component mount
  useEffect(() => {
    fetchOffers();

    // Flash sale timer
    const interval = setInterval(() => {
      const saleEndDate = new Date("2024-10-21T00:00:00"); // Example sale end date
      const remainingTime = getRemainingTime(saleEndDate);
      setFlashSaleTime(remainingTime);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/flash-sale`);
      setOffers(response.data);
    } catch (error) {
      console.error("Error fetching offers", error);
    }
  };

  const getRemainingTime = (endDate) => {
    const now = new Date();
    const remainingTime = endDate - now;
    if (remainingTime <= 0) return "Sale ended";

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Add Offer
  const addOffer = async () => {
    try {
      await axios.post(`${apiUrl}/api/flash-sale/`, newOffer);
      fetchOffers();
      setNewOffer({
        type: "",
        title: "",
        details: "",
        discountPrice: 0,
        freeDelivery: false,
      });
    } catch (error) {
      console.error("Error adding offer", error);
    }
  };

  // Delete Offer
  const deleteOffer = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/offers/${id}`);
      fetchOffers();
    } catch (error) {
      console.error("Error deleting offer", error);
    }
  };

  // Update Offer
  const updateOffer = async () => {
    try {
      await axios.put(`${apiUrl}/api/offers/${editingOffer._id}`, editingOffer);
      fetchOffers();
      setEditingOffer(null);
    } catch (error) {
      console.error("Error updating offer", error);
    }
  };

  const handleShowPreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Flash Sale</h1>

      {/* New Offer Form */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Add New Offer</h2>
        <input
          type="text"
          className="border p-2 m-2"
          placeholder="Type (e.g. buyMoreThanOne)"
          value={newOffer.type}
          onChange={(e) => setNewOffer({ ...newOffer, type: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 m-2"
          placeholder="Title"
          value={newOffer.title}
          onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
        />
        <input
          type="text"
          className="border p-2 m-2"
          placeholder="Details"
          value={newOffer.details}
          onChange={(e) =>
            setNewOffer({ ...newOffer, details: e.target.value })
          }
        />
        <input
          type="number"
          className="border p-2 m-2"
          placeholder="Discount Price"
          value={newOffer.discountPrice}
          onChange={(e) =>
            setNewOffer({ ...newOffer, discountPrice: e.target.value })
          }
        />
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={newOffer.freeDelivery}
            onChange={(e) =>
              setNewOffer({ ...newOffer, freeDelivery: e.target.checked })
            }
          />
          <span className="ml-2">Free Delivery</span>
        </label>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          onClick={addOffer}
        >
          Add Offer
        </button>
      </div>

      {/* Offers List */}
      {offers.map((offer) => (
        <div
          key={offer._id}
          className="mb-6 bg-gray-100 p-4 rounded-md shadow-md"
        >
          <h2 className="text-xl font-semibold">{offer.title}</h2>
          <p>{offer.details}</p>
          {offer.type === "flashSale" && (
            <p className="text-red-600">Ends in: {flashSaleTime}</p>
          )}

          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 mr-2"
            onClick={() => setEditingOffer(offer)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            onClick={() => deleteOffer(offer._id)}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Edit Offer Form */}
      {editingOffer && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Edit Offer</h2>
          <input
            type="text"
            className="border p-2 m-2"
            placeholder="Type (e.g. buyMoreThanOne)"
            value={editingOffer.type}
            onChange={(e) =>
              setEditingOffer({ ...editingOffer, type: e.target.value })
            }
          />
          <input
            type="text"
            className="border p-2 m-2"
            placeholder="Title"
            value={editingOffer.title}
            onChange={(e) =>
              setEditingOffer({ ...editingOffer, title: e.target.value })
            }
          />
          <input
            type="text"
            className="border p-2 m-2"
            placeholder="Details"
            value={editingOffer.details}
            onChange={(e) =>
              setEditingOffer({ ...editingOffer, details: e.target.value })
            }
          />
          <input
            type="number"
            className="border p-2 m-2"
            placeholder="Discount Price"
            value={editingOffer.discountPrice}
            onChange={(e) =>
              setEditingOffer({
                ...editingOffer,
                discountPrice: e.target.value,
              })
            }
          />
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={editingOffer.freeDelivery}
              onChange={(e) =>
                setEditingOffer({
                  ...editingOffer,
                  freeDelivery: e.target.checked,
                })
              }
            />
            <span className="ml-2">Free Delivery</span>
          </label>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={updateOffer}
          >
            Update Offer
          </button>
        </div>
      )}

      {/* Preview Section */}
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={handleShowPreview}
      >
        Toggle Preview Section
      </button>

      {showPreview && (
        <div className="mt-8 bg-gray-200 p-4 rounded-md">
          <h2 className="text-2xl font-semibold">Preview Section</h2>
          <p>Here you can see a preview of the selected offers!</p>
        </div>
      )}
    </div>
  );
};

export default FlashSale;
