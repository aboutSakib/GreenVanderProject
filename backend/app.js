const express = require("express");
const signupRoute = require("./src/routes/Signup");
const loginRoute = require("./src/routes/Login");
const categoryRoute = require("./src/routes/Category");
const productRoute = require("./src/routes/Product");
const orderRoute = require("./src/routes/Order");
const bannerRoute = require("./src/routes/Banner");
const smsRoute = require("./src/routes/Sms");
const supplierRoute = require("./src/routes/Supplier");
const settingsRoute = require("./src/routes/Settings");
const pageSettingsRoute = require("./src/routes/PageSettings");
const shippingMethodRoute = require("./src/routes/ShippingMethod");
const newArrivalProductRoute = require("./src/routes/NewArrivalProduct");
const comboOfferRoute = require("./src/routes/ComboOffer");
const ProductCart = require("./src/routes/ProductCart");
const ProductComboCart = require("./src/routes/ComboCart");
const couponRoutes = require("./src/routes/Coupon");
const flashSaleRoutes = require("./src/routes/FlashSale");
const flashOffer = require("./src/routes/FlashOffer");
const authenticateRoute = require("./src/routes/Authenticated");
const faqRoutes = require("./src/routes/faq");
const { createAdminAccount } = require("./src/defaultAdmin/Admin");
const globalErrorHandler = require("./src/utils/globalErrorHandler");
const pataoOrderRoutes = require("./src/routes/PathaoOrderRoute"); // Middleware
const bodyParser = require("body-parser");

const path = require("path");

const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());

createAdminAccount();

// routes
app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use("/api", authenticateRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/suppliers", supplierRoute);
app.use("/api/banners", bannerRoute);
app.use("/api/sms", smsRoute);
app.use("/api/settings", settingsRoute);
app.use("/api/page-settings", pageSettingsRoute);
app.use("/api/shipping", shippingMethodRoute);
app.use("/api/new-arrival", newArrivalProductRoute);
app.use("/api/combo-offer", comboOfferRoute);
app.use("/api/cart", ProductCart);
app.use("/api/combo-cart", ProductComboCart);
app.use("/api/coupons", couponRoutes);
app.use("/api/flash-sale", flashSaleRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/pathao", pataoOrderRoutes);
app.use("/api/flash-offer", flashOffer);

// Serve static files from the "public" directory
app.use(
  "/public",
  express.static(path.join(__dirname, "public"), {
    maxAge: "2d", // 2 days cache duration for static files
    setHeaders: (res, path) => {
      res.setHeader("Cache-Control", "public, max-age=172800"); // 2 days = 172800 seconds
    },
  })
);

console.log(process.env.ENVIRONMENT_MESSAGE);
app.get("/", (req, res) => {
  res.send("WELCOME TO THE SERVER!");
});

app.get("/ping", (req, res) => {
  res.send("PONG");
});
// global error handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
