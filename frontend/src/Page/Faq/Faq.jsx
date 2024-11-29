import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaMinus, FaPlus } from "react-icons/fa6";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch data from backend API
  useEffect(() => {
    fetch(`${apiUrl}/api/faqs`)
      .then((res) => res.json())
      .then((data) => setFaqs(data))
      .catch((error) => console.error("Error fetching FAQs:", error));
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-5 py-10">
      <Helmet>
        <title>FAQ | Greenvandar</title>
      </Helmet>
      <div className="max-w-2xl lg:max-w-4xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
          Find answers to common questions about our products, shipping,
          returns, and more.
        </p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-md p-4 sm:p-5 cursor-pointer transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-base sm:text-lg md:text-xl">
                {faq.question}
              </h3>
              {activeIndex === index ? (
                <FaMinus className="text-gray-500" />
              ) : (
                <FaPlus className="text-gray-500" />
              )}
            </div>
            {activeIndex === index && (
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
