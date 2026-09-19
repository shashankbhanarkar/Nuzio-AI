const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================
// REGISTER
// ==========================================

router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      language,
      profession,
      interests,
    } = req.body;


    // Check existing user

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });

    }


    // Hash password

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    // Create user

    const user = await User.create({

      name,

      email,

      password: hashedPassword,

    });


    // Create JWT

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );


    res.status(201).json({

      message: "Registration successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        language: user.language,
        profession: user.profession,
        interests: user.interests,
      },

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }

});


// ==========================================
// LOGIN
// ==========================================

router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;


    // Find user

    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(400).json({
        message: "Invalid email or password",
      });

    }


    // Compare password

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {

      return res.status(400).json({
        message: "Invalid email or password",
      });

    }


    // Create JWT

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );


    res.json({

      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        language: user.language,
        profession: user.profession,
        interests: user.interests,
      },

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }

});

router.put("/preferences", authMiddleware, async (req, res) => {
  try {
    const { language, profession, interests } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        language,
        profession,
        interests,
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Preferences saved",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to save preferences",
    });
  }
});


module.exports = router;