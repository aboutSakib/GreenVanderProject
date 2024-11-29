import { FaCartArrowDown } from "react-icons/fa";
import { FiHome, FiUser } from "react-icons/fi";

export const userLinks = [
  {
    name: "Dashboard",
    icon: <FiHome />,
    url: "/dashboard",
  },
  {
    name: "Customer Profile",
    icon: <FiUser />,
    url: "/dashboard/profile",
  },
  {
    name: "Order History",
    icon: <FaCartArrowDown />,
    url: "/dashboard/user-order-history",
  },
];
