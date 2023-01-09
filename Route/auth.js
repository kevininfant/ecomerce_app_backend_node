const e = require("express");
const express = require("express");
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require("../Models/user.js");
const jwt = require('jsonwebtoken');
const user = require("../Models/user.js");

//SignUp

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exitingUsers = await User.findOne({ email });
    if (exitingUsers) {
      return res
        .status(400)
        .json({ msg: "Users with same email already exits!" });
    }
    const hashPassword = await bcrypt.hash(password, 8);
    let user = new User({
      name,
      email,
      password: hashPassword,
    });
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//SignIn

authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Users with is email does not exits!" });
    }
    const Passworddata = await bcrypt.compare(password, user.password);
    if (!Passworddata) {
      return res
        .status(400)
        .json({ msg: "Incorrect Password!"});
    }
    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;
