import React from "react";

const Notifications = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Notifications</h2>
      <p className="text-sm text-gray-600 mb-4">All Notification settings here</p>
      <hr className="mb-6" />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-base">Enable all notifications</p>
          <input type="checkbox" defaultChecked className="toggle-checkbox" />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-base">Send email to alert new notifications</p>
          <input type="checkbox" className="toggle-checkbox" />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-base">Mute all notifications</p>
          <input type="checkbox" className="toggle-checkbox" />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
