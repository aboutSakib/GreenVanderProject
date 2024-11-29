import React from "react";

const Profile = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Profile</h2>
      <p className="text-sm text-gray-600 mb-4">Update your photo and profile here</p>
      <hr className="mb-6" />

      {/* Profile Image */}
      <div className="mb-6">
        <h3 className="text-base font-medium">Profile image</h3>
        <img loading="lazy" 
          src="/images/avatars/profile-avatar.png" 
          alt="Profile Avatar" 
          className="w-16 h-16 rounded-full mt-4"
        />
      </div>

      {/* Name Fields */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input 
            type="text" 
            defaultValue="Wabweni" 
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input 
            type="text" 
            defaultValue="Brian" 
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Username */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input 
          type="text" 
          defaultValue="Wabweni Brian" 
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          type="email" 
          defaultValue="wabwenib66@gmail.com" 
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input 
          type="text" 
          defaultValue="+256 775 358738" 
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Profile;
