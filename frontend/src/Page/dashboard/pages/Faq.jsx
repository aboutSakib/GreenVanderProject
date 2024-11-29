// src/components/AdminDashboard.js

import React, { useEffect, useState } from "react";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState({ question: "", answer: "" }); // State for preview
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch FAQs from the API
  const fetchFAQs = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/faqs`);
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  // Handle saving (adding/updating) an FAQ
  const handleSaveFAQ = async (e) => {
    e.preventDefault();

    const newFAQ = { question, answer };

    try {
      if (editId) {
        // Update FAQ
        await fetch(`${apiUrl}/api/faqs/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFAQ),
        });
      } else {
        // Add new FAQ
        await fetch(`${apiUrl}/api/faqs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFAQ),
        });
      }

      fetchFAQs();
      setQuestion("");
      setAnswer("");
      setPreview(newFAQ); // Update the preview
      setEditId(null);
    } catch (error) {
      console.error("Error saving FAQ:", error);
    }
  };

  // Handle deleting an FAQ
  const handleDeleteFAQ = async (id) => {
    try {
      await fetch(`${apiUrl}/api/faqs/${id}`, {
        method: "DELETE",
      });
      fetchFAQs();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  // Handle editing an FAQ (populates the form fields)
  const handleEditFAQ = (faq) => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setEditId(faq._id);
    setPreview(faq); // Update the preview
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 mt-6">
        Admin Dashboard - FAQ Management
      </h1>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {editId ? "Edit FAQ" : "Add New FAQ"}
        </h2>
        <form onSubmit={handleSaveFAQ} className="space-y-4">
          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            {editId ? "Update FAQ" : "Add FAQ"}
          </button>
        </form>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="p-4 border rounded shadow-sm bg-white flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="text-gray-700 mt-1">{faq.answer}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditFAQ(faq)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteFAQ(faq._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Preview FAQ</h2>
        {preview.question && (
          <div className="p-4 border rounded shadow-sm bg-white">
            <h3 className="text-lg font-semibold">{preview.question}</h3>
            <p className="text-gray-700 mt-1">{preview.answer}</p>
          </div>
        )}
        {!preview.question && (
          <p className="text-gray-500">No FAQ selected for preview.</p>
        )}
      </div>
    </div>
  );
};

export default Faq;
