import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import TagManager from "react-gtm-module";
import { RouterProvider } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext.jsx";
import "./index.css";
import { UserProvider } from "./Page/dashboard/hook/UserContext.jsx";
import router from "./Router/Router.jsx";

const queryClient = new QueryClient();
const tagManagerArgs = {
  gtmId: "GTM-MFLP5MRM",
};
TagManager.initialize(tagManagerArgs);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
