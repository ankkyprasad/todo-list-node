const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/User");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const foundEmail = await User.findOne({ email });
    const foundUsername = await User.findOne({ username });

    if (foundEmail) {
      return res.status(400).json({
        title: "error",
        error: "email already in use",
      });
    }

    if (foundUsername) {
      return res.status(400).json({
        title: "error",
        error: "username already in use",
      });
    }

    if (password.length < 7) {
      return res.status(400).json({
        title: "error",
        error: "minimum password length must be 8",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 9);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      title: "user created",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      title: "error",
      error: err,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        title: "user not found",
      });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(401).json({
        title: "login failed",
        error: "invalid username or password",
      });

    // auth done, create a token

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    return res.status(200).json({
      title: "login success",
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      title: "error",
      error: err,
    });
  }
});

module.exports = router;
