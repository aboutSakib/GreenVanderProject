import axios from "axios";
import React, { useEffect, useState } from "react";

const PageSettings = () => {
  const [settings, setSettings] = useState({
    aboutUs: "",
    deliveryPolicy: "",
    returnPolicy: "",
    privacyPolicy: "",
    termsCondition: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
    },
    popupImageUrl: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch current settings when the component loads
  const fetchSettings = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/page-settings/get-settings`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSettings(response.data); // Populate form with fetched data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching page settings", error);
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

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      socialMedia: {
        ...prevSettings.socialMedia,
        [name]: value,
      },
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("aboutUs", settings.aboutUs);
    formData.append("deliveryPolicy", settings.deliveryPolicy);
    formData.append("returnPolicy", settings.returnPolicy);
    formData.append("privacyPolicy", settings.privacyPolicy);
    formData.append("termsCondition", settings.termsCondition);
    formData.append("socialMedia[facebook]", settings.socialMedia.facebook);
    formData.append("socialMedia[instagram]", settings.socialMedia.instagram);
    formData.append("socialMedia[twitter]", settings.socialMedia.twitter);
    formData.append("socialMedia[youtube]", settings.socialMedia.youtube);

    if (image) {
      formData.append("popupImage", image);
    }

    try {
      await axios.put(
        `${apiUrl}/api/page-settings/update-settings`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Page settings updated successfully!");

      // Reset the form fields after submission
      setSettings({
        aboutUs: "",
        deliveryPolicy: "",
        returnPolicy: "",
        privacyPolicy: "",
        termsCondition: "",
        socialMedia: {
          facebook: "",
          instagram: "",
          twitter: "",
          youtube: "",
        },
        popupImageUrl: "",
      });

      // Clear image input
      setImage(null);

      // Hard refresh the page after update
      setTimeout(() => {
        window.location.reload(); // This will reload the page and clear the form
      }, 1000); // Small delay to show success message before refreshing
    } catch (error) {
      console.error("Error updating settings", error);
      setMessage("Failed to update settings.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Page Settings</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            {/* Form for updating settings */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-medium mb-2">
                  About Us
                </label>
                <textarea
                  name="aboutUs"
                  value={settings.aboutUs}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows="5"
                ></textarea>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">
                  Delivery Policy
                </label>
                <textarea
                  name="deliveryPolicy"
                  value={settings.deliveryPolicy}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows="5"
                ></textarea>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">
                  Return Policy
                </label>
                <textarea
                  name="returnPolicy"
                  value={settings.returnPolicy}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows="5"
                ></textarea>
              </div>
              <div>
                <label className="block text-lg font-medium mb-2">
                  Privacy Policy
                </label>
                <textarea
                  name="privacyPolicy"
                  value={settings.privacyPolicy}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows="5"
                ></textarea>
              </div>
              <div>
                <label className="block text-lg font-medium mb-2">
                  Terms & Condition
                </label>
                <textarea
                  name="termsCondition"
                  value={settings.termsCondition}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows="5"
                ></textarea>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Social Media Links</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="facebook"
                    placeholder="Facebook URL"
                    value={settings.socialMedia.facebook}
                    onChange={handleSocialMediaChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    name="instagram"
                    placeholder="Instagram URL"
                    value={settings.socialMedia.instagram}
                    onChange={handleSocialMediaChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    name="twitter"
                    placeholder="Twitter URL"
                    value={settings.socialMedia.twitter}
                    onChange={handleSocialMediaChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    name="youtube"
                    placeholder="YouTube URL"
                    value={settings.socialMedia.youtube}
                    onChange={handleSocialMediaChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">
                  Popup Image
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {settings.popupImageUrl && !image && (
                  <div className="mt-4">
                    <p className="font-medium">Current Image:</p>
                    <img loading="lazy"
                      src={apiUrl+'/'+settings.popupImageUrl}
                      alt="Popup"
                      className="w-32 h-32 object-cover rounded-lg mt-2"
                    />
                  </div>
                )}
                {image && (
                  <div className="mt-4">
                    <p className="font-medium">New Image Preview:</p>
                    <img loading="lazy"
                      src={URL.createObjectURL(image)}
                      alt="Popup Preview"
                      className="w-32 h-32 object-cover rounded-lg mt-2"
                    />
                  </div>
                )}
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
                <h3 className="text-lg font-semibold">About Us:</h3>
                <p className="text-gray-700">
                  {settings.aboutUs || "No content available"}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Delivery Policy:</h3>
                <p className="text-gray-700">
                  {settings.deliveryPolicy || "No content available"}
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">Return Policy:</h3>
                <p className="text-gray-700">
                  {settings.returnPolicy || "No content available"}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Privacy Policy:</h3>
                <p className="text-gray-700">
                  {settings.privacyPolicy || "No content available"}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Terms & Condition:</h3>
                <p className="text-gray-700">
                  {settings.termsCondition || "No content available"}
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">Social Media:</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>Facebook: {settings.socialMedia.facebook || "N/A"}</li>
                  <li>Instagram: {settings.socialMedia.instagram || "N/A"}</li>
                  <li>Twitter: {settings.socialMedia.twitter || "N/A"}</li>
                  <li>YouTube: {settings.socialMedia.youtube || "N/A"}</li>
                </ul>
              </div>
              {settings.popupImageUrl && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold">Popup Image:</h3>
                  <img loading="lazy"
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : settings.popupImageUrl
                    }
                    alt="Popup Preview"
                    className="w-48 h-48 object-cover rounded-lg mt-2"
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PageSettings;
