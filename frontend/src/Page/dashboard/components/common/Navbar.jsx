import React from "react";
import UseAdmin from "../../hook/UseAdmin";
import ProfileMenu from "./ProfileMenu";
import Sidebar from "./Sidebar";
import UserSidebar from "./UserSidebar"; // Ensure you import UserSidebar

const Navbar = ({ sideBarWidth }) => {
  const [isAdmin] = UseAdmin();

  // Show loading state if admin status is still loading

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 md:w-[calc(100%-${sideBarWidth}px)] md:ml-[${sideBarWidth}px]`}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">
            {/* Always render UserSidebar */}
            {isAdmin ? (
              <Sidebar sideBarWidth={sideBarWidth} />
            ) : (
              <UserSidebar />
            )}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <ProfileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
