const bcrypt = require("bcrypt");
const User = require("../models/user");
const Role = require("../models/role");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingEmailUser = await User.findOne({ email });
    const existingPseudoUser = await User.findOne({ pseudo });

    if (existingEmailUser) {
      return res.status(400).send({ error: "Email already exists" });
    }

    if (existingPseudoUser) {
      return res.status(400).send({ error: "Pseudo already exists" });
    }

    // Create a new user with the provided email and hashed password
    const hashedPassword = await bcrypt.hash(password, 8);
    const role = await Role.findOne({ name: "user" });

    const newUser = new User({
      pseudo,
      email,
      password: hashedPassword,
      roles: [role.name],
    });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration", error);
    res.status(500).json({ error: "Error during registration" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    const passwordMatches = await bcrypt.compare(password, user.password);

    // Check if the user exists and the password matches
    if (!user || !passwordMatches) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate a new token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.send({
      message: "User logged in successfully",
      // userId: user.id,
      userPseudo: user.pseudo,
      userEmail: user.email,
      accessToken: token,
    });
  } catch (error) {
    console.error("Error during user login", error);
    res.status(500).json({ error: "Error during login" });
  }
};
