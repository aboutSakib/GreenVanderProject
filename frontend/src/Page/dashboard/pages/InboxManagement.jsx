import axios from "axios";
import React, { useEffect, useState } from "react";

const InboxManagement = () => {
  const [smsList, setSmsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch all SMS records when the component loads
  const fetchAllSMS = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/sms/all-sms`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSmsList(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching SMS records.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSMS();
  }, []);

  // Handle deleting SMS
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/sms/delete-sms/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage("SMS deleted successfully!");
      setSmsList(smsList.filter((sms) => sms._id !== id));
    } catch (error) {
      setError("Failed to delete SMS.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 mt-8">
          Inbox Management
        </h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Recipient</th>
                  <th className="py-3 px-6 text-left">Subject</th>
                  <th className="py-3 px-6 text-left">Message</th>

                  <th className="py-3 px-6 text-left">Date Sent</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {smsList.map((sms) => (
                  <tr key={sms._id} className="border-b">
                    <td className="py-3 px-6">{sms.firstName}</td>
                    <td className="py-3 px-6">{sms.recipient}</td>
                    <td className="py-3 px-6">{sms.subject}</td>
                    <td className="py-3 px-6">{sms.message}</td>

                    <td className="py-3 px-6">
                      {new Date(sms.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={() => handleDelete(sms._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {message && (
          <p className="text-center text-green-500 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default InboxManagement;
