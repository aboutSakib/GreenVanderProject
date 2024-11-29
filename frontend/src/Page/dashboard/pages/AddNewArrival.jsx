import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiTrash2, FiUpload } from "react-icons/fi";

const AddNewArrival = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null); // For the uploaded image
  const [imagePreview, setImagePreview] = useState(null); // For the image preview
  const [newArrivals, setNewArrivals] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch all new arrival products on page load
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You need to log in.");
          return;
        }

        const response = await axios.get(
          `${apiUrl}/api/new-arrival/all-new-arival-products`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error.message);
      }
    };
    fetchNewArrivals();
  }, []);

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Handle form submission to add a new arrival
  const handleAddNewArrival = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload a new arrival image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append("image", image); // Image file

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token not found. Please log in.");
        return;
      }

      const response = await axios.post(
        `${apiUrl}/api/new-arrival/add-new-arrival`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      setNewArrivals([...newArrivals, response.data.product]); // Updated to reflect correct response
      setTitle(""); // Reset form
      setLink("");
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error(
        "Error adding new arrival:",
        error.response || error.message
      );
      if (error.response?.status === 401) {
        alert("Unauthorized: Please log in.");
      } else {
        alert("Error adding new arrival. Please try again.");
      }
    }
  };

  // Handle new arrival deletion
  const handleDeleteNewArrival = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to log in.");
        return;
      }

      await axios.delete(
        `${apiUrl}/api/new-arrival/delete-new-arrival/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewArrivals(newArrivals.filter((arrival) => arrival._id !== id)); // Update the list
      alert("New arrival deleted successfully!");
    } catch (error) {
      console.error("Error deleting new arrival:", error.message);
      alert("Failed to delete new arrival. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold text-center mb-8 mt-8">
        Add New Arrival Images
      </h1>

      <form
        onSubmit={handleAddNewArrival}
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
            Add New Arrival Image
          </label>
          <div className="flex items-center mt-1">
            <input
              type="file"
              className="hidden"
              id="newArrivalImage"
              onChange={handleImageChange}
              accept="image/*"
            />
            <label
              htmlFor="newArrivalImage"
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
                alt="New Arrival Preview"
                className="w-full h-64 object-cover rounded-md shadow-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add New Arrival Image
        </button>
      </form>

      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-4">All New Arrival Images</h2>
        {newArrivals.length > 0 ? (
          <ul className="space-y-4">
            {newArrivals.map((newArrival) => (
              <li
                key={newArrival._id}
                className="flex justify-between items-center p-4 bg-white shadow-md rounded-md"
              >
                <div>
                  <h3 className="text-lg font-semibold">{newArrival.title}</h3>
                  {newArrival.link && (
                    <a
                      href={newArrival.link}
                      className="text-blue-500 underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {newArrival.link}
                    </a>
                  )}
                </div>
                <img loading="lazy"
                  src={`${apiUrl}/${newArrival.imageUrl}`}
                  alt={newArrival.title}
                  className="h-16 w-32 object-cover rounded-md"
                />
                <button
                  onClick={() => handleDeleteNewArrival(newArrival._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">
            No new arrival images available.
          </p>
        )}
      </div>
    </div>
  );
};

export default AddNewArrival;
