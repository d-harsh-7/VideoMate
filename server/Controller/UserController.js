const User = require("../Model/User");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    await User.create({ name, email, password });

    return res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function handleUserSignin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User found" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  handleUserSignup,
  handleUserSignin,
};



