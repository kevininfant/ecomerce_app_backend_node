const e = require("express");
const express = require("express");
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require("../Models/user.js");

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exitingUsers = await User.findOne({ email });
    if (exitingUsers) {
      return res
        .status(400)
        .json({ msg: "Users with same email already exits!" });
    }
  const hashPassword =  await  bcrypt.hash(password,8);
    let user = new User({
      name,
      email,
      password : hashPassword ,
    });
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;
