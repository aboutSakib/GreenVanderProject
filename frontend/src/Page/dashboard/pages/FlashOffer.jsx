import { useEffect, useState } from "react";
import axios from "axios";

function FlashOffer() {
  const [offers, setOffers] = useState([]);
  const [name1, setName1] = useState(""); // State for name1
  const [name2, setName2] = useState(""); // State for name2

  const [editingId, setEditingId] = useState(null);

  // Fetch offers from the backend
  const fetchOffers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/flash-offer");
      setOffers(response.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Handle form submission for adding or editing an offer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update offer if in editing mode
        await axios.put(`http://localhost:5000/api/flash-offer/${editingId}`, {
          name1,
          name2,
        });
        setEditingId(null);
      } else {
        // Create new offer
        await axios.post("http://localhost:5000/api/flash-offer", {
          name1,
          name2,
        });
      }
      setName1(""); // Reset name1
      setName2(""); // Reset name2

      fetchOffers(); // Refresh the offer list
    } catch (error) {
      console.error("Error submitting offer:", error);
    }
  };

  // Handle deleting an offer
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/flash-offer/${id}`);
      fetchOffers(); // Refresh the offer list
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  // Handle editing an offer (populate the form)
  const handleEdit = (offer) => {
    setName1(offer.name1);
    setName2(offer.name2);

    setEditingId(offer._id);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Flash Offer Management</h1>

      {/* Offer Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Offer Name 1"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Offer Name 2"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          className="border p-2 w-full"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {editingId ? "Update Offer" : "Add Offer"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setName1("");
              setName2("");
            }}
            className="bg-gray-500 text-white px-4 py-2 ml-2"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Offer List */}
      <div>
        {offers.length === 0 ? (
          <p>No offers available.</p>
        ) : (
          offers.map((offer) => (
            <div
              key={offer._id}
              className="border-b p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-medium">
                  {offer.name1} - {offer.name2}
                </h2>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(offer)}
                  className="bg-yellow-500 text-white px-4 py-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(offer._id)}
                  className="bg-red-500 text-white px-4 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FlashOffer;
