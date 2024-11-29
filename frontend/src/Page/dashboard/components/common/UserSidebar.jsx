import React from "react";
import { FiMenu } from "react-icons/fi";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import logo from "../../../../Images/logo/logo.jpg";
import { userLinks } from "../../UserDashboard/UserLinks"; // Ensure userLinks is correctly imported
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";

const UserSidebar = ({ sideBarWidth }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <button onClick={toggleDrawer}>
        <FiMenu />
      </button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="user-sidebar"
        style={{ width: sideBarWidth }}
      >
        <div className="w-full h-full bg-white p-4">
          <div className="flex items-center p-4 border-b">
            <img
              loading="lazy"
              src={logo}
              alt="Logo"
              className="mr-2 h-8 w-auto"
            />
          </div>
          <ul className="mt-4">
            {userLinks.map((link, index) =>
              link.subLinks ? (
                <SidebarItemCollapse {...link} key={index} />
              ) : (
                <SidebarItem {...link} key={index} />
              )
            )}
          </ul>
        </div>
      </Drawer>
    </>
  );
};

export default UserSidebar;
