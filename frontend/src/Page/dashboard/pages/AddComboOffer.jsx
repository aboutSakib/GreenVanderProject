import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiTrash2, FiUpload } from "react-icons/fi";

const AddComboOffer = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [comboOffers, setComboOffers] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchComboOffers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You need to log in.");
          return;
        }

        const response = await axios.get(
          `${apiUrl}/api/combo-offer/all-combo-offers`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setComboOffers(response.data);
      } catch (error) {
        console.error("Error fetching combo offers:", error.message);
      }
    };
    fetchComboOffers();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddComboOffer = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload a combo offer image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token not found. Please log in.");
        return;
      }

      const response = await axios.post(
        `${apiUrl}/api/combo-offer/add-combo-offer`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      setComboOffers([...comboOffers, response.data.offer]);
      setTitle("");
      setLink("");
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error(
        "Error adding combo offer:",
        error.response || error.message
      );
      if (error.response?.status === 401) {
        alert("Unauthorized: Please log in.");
      } else {
        alert("Error adding combo offer. Please try again.");
      }
    }
  };

  const handleDeleteComboOffer = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to log in.");
        return;
      }

      await axios.delete(
        `${apiUrl}/api/combo-offer/delete-combo-offer/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComboOffers(comboOffers.filter((offer) => offer._id !== id));
      alert("Combo offer deleted successfully!");
    } catch (error) {
      console.error("Error deleting combo offer:", error.message);
      alert("Failed to delete combo offer. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold text-center mb-8 mt-8">
        Add Combo Offer Images
      </h1>

      <form
        onSubmit={handleAddComboOffer}
        className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            className="mt-1 w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Link
          </label>
          <input
            type="text"
            className="mt-1 w-full p-2 border rounded"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Optional"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Add Combo Offer Image
          </label>
          <div className="flex items-center mt-1">
            <input
              type="file"
              className="hidden"
              id="comboOfferImage"
              onChange={handleImageChange}
              accept="image/*"
            />
            <label
              htmlFor="comboOfferImage"
              className="cursor-pointer flex items-center px-4 py-2 border rounded-md bg-blue-500 text-white"
            >
              <FiUpload className="mr-2" /> Upload Image
            </label>
          </div>

          {imagePreview && (
            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-700 mb-2">
                Image Preview:
              </h2>
              <img loading="lazy"
                src={imagePreview}
                alt="Combo Offer Preview"
                className="w-full h-64 object-cover rounded-md shadow-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Combo Offer Image
        </button>
      </form>

      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-4">All Combo Offer Images</h2>
        {comboOffers.length > 0 ? (
          <ul className="space-y-4">
            {comboOffers.map((combo) => (
              <li
                key={combo._id}
                className="flex justify-between items-center p-4 bg-white shadow-md rounded-md"
              >
                <div>
                  <h3 className="text-lg font-semibold">{combo.title}</h3>
                  {combo.link && (
                    <a
                      href={combo.link}
                      className="text-blue-500 underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {combo.link}
                    </a>
                  )}
                </div>
                <img loading="lazy"
                  src={`${apiUrl}/${combo.imageUrl}`}
                  alt={combo.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <button
                  onClick={() => handleDeleteComboOffer(combo._id)}
                  className="ml-4 bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                >
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No combo offers found.</p>
        )}
      </div>
    </div>
  );
};

export default AddComboOffer;
