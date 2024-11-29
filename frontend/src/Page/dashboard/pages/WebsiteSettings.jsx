import axios from "axios";
import React, { useEffect, useState } from "react";

const WebsiteSettings = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [settings, setSettings] = useState({
    phone: "",
    whatsappNumber: "",
    email: "",
    address: "",
    currency: "",
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch current settings when the component loads
  const fetchSettings = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/settings/get-settings`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSettings(response.data); // Populate form with fetched data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching settings", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${apiUrl}/api/settings/update-settings`,
        settings,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage("Settings updated successfully!");

      // Full page refresh after a brief delay to show the success message
      setTimeout(() => {
        window.location.reload(); // This will refresh the entire page
      }, 1000); // 1 second delay to let user see success message
    } catch (error) {
      console.error("Error updating settings", error);
      setMessage("Failed to update settings.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Website Settings
        </h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            {/* Form for updating settings */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-medium mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  name="whatsappNumber"
                  value={settings.whatsappNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows="3"
                ></textarea>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">
                  Currency
                </label>
                <input
                  type="text"
                  name="currency"
                  value={settings.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {message && (
                <div className="text-center text-green-600 font-medium mb-4">
                  {message}
                </div>
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  Update Settings
                </button>
              </div>
            </form>

            {/* Preview Section */}
            <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Settings Preview</h2>
              <div>
                <h3 className="text-lg font-semibold">Phone:</h3>
                <p className="text-gray-700">{settings.phone || "N/A"}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">WhatsApp Number:</h3>
                <p className="text-gray-700">
                  {settings.whatsappNumber || "N/A"}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Email:</h3>
                <p className="text-gray-700">{settings.email || "N/A"}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Address:</h3>
                <p className="text-gray-700">{settings.address || "N/A"}</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Currency:</h3>
                <p className="text-gray-700">{settings.currency || "N/A"}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WebsiteSettings;
