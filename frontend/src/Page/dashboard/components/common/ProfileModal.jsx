import React from "react";
import { Dialog } from "@headlessui/react";

const ProfileModal = ({ isOpen, onClose }) => {
  // Fetch user data from localStorage (or you could fetch it from an API)
  const user = JSON.parse(localStorage.getItem("user")) || {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    role: "customer",
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true"></div>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 z-10">
        <Dialog.Title className="text-lg font-bold">Profile Info</Dialog.Title>
        <div className="mt-4">
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
        <div className="mt-6 text-right">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ProfileModal;
