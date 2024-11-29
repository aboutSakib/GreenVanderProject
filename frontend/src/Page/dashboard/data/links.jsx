import { BsFillCartCheckFill } from "react-icons/bs";
import { FaCartArrowDown, FaShare, FaRegNewspaper } from "react-icons/fa";
import {
  FiHome,
  FiLayers,
  FiMessageCircle,
  FiSettings,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";
import { CiDeliveryTruck } from "react-icons/ci";

export const links = [
  {
    name: "Dashboard",
    icon: <FiHome />,
    url: "/dashboard/profile",
  },
  {
    name: "Products",
    icon: <FiShoppingBag />,
    subLinks: [
      {
        name: "All Products",
        url: "/dashboard/products",
      },
      {
        name: "Add Product",
        url: "/dashboard/products/add",
      },
      {
        name: "Product Category",
        url: "/dashboard/products/categories",
      },
    ],
  },
  {
    name: "Customers",
    icon: <FiUsers />,
    url: "/dashboard/customers",
  },
  {
    name: "Banner",
    icon: <FaRegNewspaper />, // Updated icon for Banner
    url: "/dashboard/banner",
  },

  {
    name: "Orders",
    icon: <BsFillCartCheckFill />, // Updated icon for Orders
    subLinks: [
      {
        name: "All Orders",
        url: "/dashboard/orders",
      },
    ],
  },
  {
    name: "Suppliers",
    icon: <FaShare />,
    url: "/dashboard/suppliers",
  },
  {
    name: "Page Settings",
    icon: <FiSettings />,
    url: "/dashboard/page-settings",
  },
  {
    name: "Website Settings",
    icon: <FiLayers />,
    url: "/dashboard/website-settings",
  },
  {
    name: "Inbox Management",
    icon: <FiMessageCircle />,
    url: "/dashboard/inbox",
  },
  {
    name: "Coupon Management",
    icon: <FiSettings />,
    url: "/dashboard/coupon",
  },
  {
    name: "Settings",
    icon: <FiSettings />,
    url: "/dashboard/settings",
  },
  {
    name: "New Arrival",
    icon: <FiShoppingBag />, // Updated icon for New Arrival
    url: "/dashboard/new-arrival",
  },
  {
    name: "Combo Offer",
    icon: <FaCartArrowDown />, // Updated icon for Combo Offer
    url: "/dashboard/combo-offer",
  },
  {
    name: "Flash Sale",
    icon: <FiSettings />,
    url: "/dashboard/flash-sale",
  },
  {
    name: "Flash Offer",
    icon: <FiSettings />,
    url: "/dashboard/flash-offer",
  },
  {
    name: "FAQ",
    icon: <FiMessageCircle />, // Updated icon for FAQ
    url: "/dashboard/faq",
  },
  {
    name: "Flash Sale Management",
    icon: <FiSettings />,
    url: "/dashboard/flash-sales-management",
  },
  {
    name: "Pathao",
    icon: <CiDeliveryTruck />,
    url: "/dashboard/pathao",
  },
];
