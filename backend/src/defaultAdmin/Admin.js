const User = require("../models/User");
const bcrypt = require("bcrypt");

async function createAdminAccount() {
  try {
    const email = "admin@test.com".trim().toLowerCase();

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log("Admin account already exists.");
    } else {
      const newAdmin = new User({
        firstName: "Admin",
        lastName: "123",
        email,
        password: await bcrypt.hash("password123", 10),
        role: "admin",
      });
      await newAdmin.save();
      console.log("Admin account created.");
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { createAdminAccount };
