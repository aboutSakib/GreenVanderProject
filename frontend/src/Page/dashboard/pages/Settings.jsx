import axios from "axios";
import React, { useEffect, useState } from "react";

const Settings = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [tab, setTab] = useState(0); // 0 = Profile, 1 = Password

  // Fetch Profile Data
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle Profile Form Change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle Password Form Change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  // Update Profile
  const updateProfile = async () => {
    try {
      await axios.put(`${apiUrl}/api/user`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Change Password
  const changePassword = async () => {
    try {
      await axios.put(
        `${apiUrl}/api/change-password`,
        passwords,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Password changed successfully!");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="pt-20 pb-5 px-4">
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>

        {/* Tabs */}
        <div className="w-full mt-4">
          <div className="border-b border-gray-300 mb-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setTab(0)}
                className={`py-2 px-4 focus:outline-none ${
                  tab === 0
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setTab(1)}
                className={`py-2 px-4 focus:outline-none ${
                  tab === 1
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
              >
                Password
              </button>
            </div>
          </div>

          {/* Profile Tab */}
          {tab === 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Profile</h3>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={updateProfile}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* Password Tab */}
          {tab === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Change Password</h3>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={changePassword}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Change Password
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
