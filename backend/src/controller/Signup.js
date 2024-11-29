const User = require("../models/User");

const bcrypt = require("bcrypt");

async function signupUser(req, res, next) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "customer",
    });
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    next(error);
  }
}

module.exports = { signupUser };
