import { createBrowserRouter } from "react-router-dom";
import Home from "../home/Home";
import Main from "../Layout/Main";
import Cart from "../Page/Cart/Cart";
import ComboOfferProduct from "../Page/ComboOffer/ComboOfferProduct";
import Contact from "../Page/Contact/Contact";
import Dashboard from "../Page/dashboard/layout/Dashboard/Dashboard";
import AddProduct from "../Page/dashboard/pages/AddProduct";
import BannerManagement from "../Page/dashboard/pages/BannerManagement";
import Customers from "../Page/dashboard/pages/Customers";
import DashboardMain from "../Page/dashboard/pages/Dashboard";
import ProductCategories from "../Page/dashboard/pages/ProductCategories";
import SingleProduct from "../Page/dashboard/pages/SingleProduct";
import SupplierManagement from "../Page/dashboard/pages/Supplier Management/SupplierManagement";
import FAQ from "../Page/Faq/Faq";
import FlashSaleProducts from "../Page/flashSale/FlashSaleProducts";
import Login from "../Page/login/Login";
import OrderConfirmation from "../Page/OrderConfirmation/OrderConfirmation ";
import Products from "../Page/products/Products";
import ProductsDetails from "../Page/products/ProductsDetails";
import ReturnPolicy from "../Page/ReturnPolicy/ReturnPolicy";
import Signup from "../Page/signup/Signup";
import AdminRoute from "./AdminRouter";
import PrivateRoute from "./PrivateRoute";

import OrderManagement from "../Page/dashboard/pages/OrderManagement";
import ProductSales from "../Page/dashboard/pages/ProductSales";

import AboutUs from "../Page/AboutUs/AboutUs";
import BuyNow from "../Page/Buy now/BuyNow";
import BuyNowProducts from "../Page/Buy now/BuyNowProducts";
import CategoryProduct from "../Page/CategoryPage/CategoryProduct";
import Checkout from "../Page/Checkout/Checkout";
import {
  Coupon,
  Faq,
  FlashOffer,
  FlashSaleManagement,
  Pathao,
} from "../Page/dashboard/pages";
import AddComboOffer from "../Page/dashboard/pages/AddComboOffer";
import AddNewArrival from "../Page/dashboard/pages/AddNewArrival";
import AdminProducts from "../Page/dashboard/pages/AdminProducts";
import FlashSale from "../Page/dashboard/pages/FlashSale";
import InboxManagement from "../Page/dashboard/pages/InboxManagement";
import PageSettings from "../Page/dashboard/pages/PageSettings";
import Settings from "../Page/dashboard/pages/Settings";
import SingleOrder from "../Page/dashboard/pages/SingleOrder";
import WebsiteSettings from "../Page/dashboard/pages/WebsiteSettings";
import OrderHistory from "../Page/dashboard/UserDashboard/OrderHistory/OrderHistory";
import UserProfile from "../Page/dashboard/UserDashboard/UserProfile/UserProfile";
import DeliveryPolicy from "../Page/DeliveryPolicy/DeliveryPolicy";
import PrivacyPolicy from "../Page/PrivacyPolicy/PrivacyPolicy";
import AddProductModalDetalis from "../Page/products/AddProductModalDetalis";
import TermsAndCondition from "../Page/Terms&Condition/TermsAndCondition";
const apiUrl = import.meta.env.VITE_API_URL;
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    // errorElement:<Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <ProductsDetails></ProductsDetails>,
      },
      {
        path: "/products/:id",
        element: <AddProductModalDetalis />,
        loader: ({ params }) =>
          fetch(`${apiUrl}/api/products/single-product/${params.id}`),
      },
      {
        path: "/flashsale-product",
        element: <FlashSaleProducts />,
      },
      {
        path: "/combo-offer",
        element: <ComboOfferProduct />,
      },
      {
        path: "/category/:category/subcategory/:subcategory",
        element: <CategoryProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/buy-now/:id",
        element: <BuyNow />,
      },

      {
        path: "/buy-now/",
        element: <BuyNowProducts />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/return-policy",
        element: <ReturnPolicy />,
      },
      {
        path: "/terms-condition",
        element: <TermsAndCondition />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/delivery-policy",
        element: <DeliveryPolicy />,
      },
      {
        path: "/order-confirm",
        element: <OrderConfirmation />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/profile",
        element: <UserProfile />,
      },
      {
        path: "/dashboard/user-order-history",
        element: <OrderHistory />,
      },
      {
        path: "/dashboard/profile",
        element: (
          <AdminRoute>
            <DashboardMain />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/products",
        element: (
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/products/add",
        element: (
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/products/:id",
        element: (
          <AdminRoute>
            <SingleProduct />
          </AdminRoute>
        ),
      },

      {
        path: "/dashboard/products/categories",
        element: (
          <AdminRoute>
            <ProductCategories />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/customers",
        element: (
          <AdminRoute>
            <Customers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/suppliers",
        element: (
          <AdminRoute>
            <SupplierManagement />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/banner",
        element: (
          <AdminRoute>
            <BannerManagement />
          </AdminRoute>
        ),
      },

      {
        path: "/dashboard/sales",
        element: (
          <AdminRoute>
            <ProductSales />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/orders",

        element: (
          <AdminRoute>
            <OrderManagement />
          </AdminRoute>
        ),
      },

      {
        path: "/dashboard/orders/:id",
        element: (
          <AdminRoute>
            <SingleOrder />
          </AdminRoute>
        ),
      },

      {
        path: "/dashboard/page-settings",
        element: (
          <AdminRoute>
            <PageSettings />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/Website-settings",
        element: (
          <AdminRoute>
            <WebsiteSettings />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/inbox",
        element: (
          <AdminRoute>
            <InboxManagement />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/settings",
        element: (
          <AdminRoute>
            <Settings />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/new-arrival",
        element: (
          <AdminRoute>
            <AddNewArrival />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/combo-offer",
        element: (
          <AdminRoute>
            <AddComboOffer />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/flash-sale",
        element: (
          <AdminRoute>
            <FlashSale />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/flash-offer",
        element: (
          <AdminRoute>
            <FlashOffer />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/faq",
        element: (
          <AdminRoute>
            <Faq />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/coupon",
        element: (
          <AdminRoute>
            <Coupon />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/Flash-sales-management",
        element: (
          <AdminRoute>
            <FlashSaleManagement />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/pathao",
        element: (
          <AdminRoute>
            <Pathao />
          </AdminRoute>
        ),
      },
    ],
  },
]);
export default router;
