import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FiTrash2, FiUpload } from "react-icons/fi";

const BannerManagement = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null); // For the uploaded image
  const [imagePreview, setImagePreview] = useState(null); // For the image preview
  const [banners, setBanners] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch all banners on page load
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You need to log in.");
          return;
        }

        const response = await axios.get(
          `${apiUrl}/api/banners/all-banners`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching banners:", error.message);
      }
    };
    fetchBanners();
  },[apiUrl]);
console.log('redner');

  
  // Handle banner image upload and preview
  const handleImageChange = (e) => {    
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Handle form submission to add a new banner
  const handleAddBanner = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload a banner image.");
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

      const response = await axios.post(`${apiUrl}/api/banners/add-banner`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Token format
        },
      });

      alert(response.data.message);
      setBanners([...banners, response.data.banner]);
      setTitle(""); // Reset form
      setLink("");
      setImage(null);
      setImagePreview(null);
      // Reset the input value to allow re-selecting the same file
      fileInputRef.current.value = null;
    } catch (error) {
      console.error("Error adding banner:", error.response || error.message);
      if (error.response?.status === 401) {
        alert("Unauthorized: Please log in.");
      }
    }
  };

  // Handle banner deletion
  const handleDeleteBanner = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to log in.");
        return;
      }

      await axios.delete(
        `${apiUrl}/api/banners/delete-banner/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBanners(banners.filter((banner) => banner._id !== id)); // Update the list
      alert("Banner deleted successfully!");
    } catch (error) {
      console.error("Error deleting banner:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-8">Banner Management</h1>

      {/* Add Banner Form */}
      <form onSubmit={handleAddBanner} className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Link</label>
          <input type="text" className="mt-1 w-full p-2 border rounded" value={link} onChange={(e) => setLink(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Banner Image</label>
          <div className="flex items-center mt-1">
            <input type="file" id="bannerImage" onChange={handleImageChange} accept="image/*" hidden ref={fileInputRef} />
            <label htmlFor="bannerImage" className="cursor-pointer flex items-center px-4 py-2 border rounded-md bg-blue-500 text-white">
              <FiUpload className="mr-2" /> Upload Image
            </label>
          </div>

          {/* Preview of the uploaded image */}
          {imagePreview && (
            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-700 mb-2">Image Preview:</h2>
              <img loading="lazy" src={imagePreview} alt="Banner Preview" className="w-full h-64 object-cover rounded-md shadow-md" />
            </div>
          )}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Add Banner
        </button>
      </form>

      {/* List of Banners */}
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-4">All Banners</h2>
        {banners.length > 0 ? (
          <ul className="space-y-4">
            {banners.map((banner) => (
              <li key={banner._id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-md">
                <div>
                  <h3 className="text-lg font-semibold">{banner.title}</h3>
                  {banner.link && (
                    <a href={banner.link} className="text-blue-500 underline text-sm" target="_blank" rel="noopener noreferrer">
                      {banner.link}
                    </a>
                  )}
                </div>
                <img loading="lazy" src={`${apiUrl}/${banner.imageUrl}`} alt={banner.title} className="h-16 w-32 object-cover rounded-md" />
                <button onClick={() => handleDeleteBanner(banner._id)} className="text-red-500 hover:text-red-700">
                  <FiTrash2 size={20} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No banners available.</p>
        )}
      </div>
    </div>
  );
};

export default BannerManagement;
