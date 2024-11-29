require("dotenv").config();
const mongoose = require("mongoose");

// mongoose.connect ("mongodb+srv://fahadhasan164:KMBPFLsuWbmHJUtc@cluster0.klzry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
//     serverSelectionTimeoutMS: 5000
// });
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 5000,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB: ", err);
});

module.exports = mongoose;
