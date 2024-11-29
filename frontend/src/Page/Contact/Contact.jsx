/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaLocationDot } from "react-icons/fa6";
import { ImPhone } from "react-icons/im";
import { IoMdMail } from "react-icons/io";
import Swal from "sweetalert2";

const Contact = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: Check if all fields are filled
    const { firstName, email, subject, message } = formData;
    if (!firstName || !email || !subject || !message) {
      Swal.fire({
        icon: "warning",
        title: "All fields are required!",
        text: "Please fill out all the fields.",
      });
      return;
    }

    try {
      // Simulate sending form data to server
      const response = await fetch(`${apiUrl}/api/sms/add-sms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you for contacting us. We will get back to you soon.",
        });
        setFormData({ firstName: "", email: "", subject: "", message: "" }); // Reset form
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Contact |Greenvandar</title>
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF] sm:px-4 px-1">
        <div className="bg-white sm:p-8 p-3 rounded w-full max-w-md md:max-w-lg lg:max-w-3xl">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4">
            Get in Touch for Collaboration
          </h2>
          <p className="text-center mb-8 text-gray-600">
            Get in touch with us using any of the options below:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center border bg-[#F9FAFB66] rounded-lg px-[30px] py-5 space-x-4">
              <ImPhone className="border-2 border-gray-500 rounded-full text-5xl p-2" />
              <div>
                <p className="mt-2 font-bold text-[#101828] text-2xl">Phone</p>
                <p className="text-[#1D2939] text-base">+88 01712-345678</p>
              </div>
            </div>
            <div className="flex items-center border bg-[#F9FAFB66] rounded-lg px-[30px] py-5 space-x-4">
              <IoMdMail className="border-2 border-gray-500 rounded-full text-5xl p-2" />
              <div>
                <p className="mt-2 font-bold text-[#101828] text-2xl">E-mail</p>
                <p className="text-[#1D2939] text-base">fabrio@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="flex items-center border bg-[#F9FAFB66] rounded-lg px-[30px] py-5 space-x-4 mb-6">
            <FaLocationDot className="border-2 border-gray-500 rounded-full text-5xl p-2" />
            <div>
              <p className="mt-2 font-bold text-[#101828] text-2xl">Location</p>
              <p className="text-[#1D2939] text-base">
                Bazar Rd, Savar bus stand, Savar, Dhaka
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 border bg-[#F9FAFB66] rounded-lg p-4"
          >
            <h1 className="text-[#101828] font-semibold text-2xl">
              Send Message
            </h1>
            <hr />
            <label>
              <h1 className="text-[#344054] text-base font-medium py-2 mt-2">
                First Name
              </h1>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </label>

            <label>
              <h1 className="text-[#344054] text-base font-medium py-2">
                Email
              </h1>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </label>

            <label>
              <h1 className="text-[#344054] text-base font-medium py-2">
                Subject
              </h1>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </label>

            <label>
              <h1 className="text-[#344054] text-base font-medium py-2">
                Type message
              </h1>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type message"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                rows="4"
              ></textarea>
            </label>

            <div>
              <button
                type="submit"
                className="w-32 p-3 bg-[#E31326] text-base font-bold text-white rounded-full hover:bg-red-600 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
