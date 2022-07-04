const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../../models/User");
const { validationResult } = require("express-validator");
const { generateToken } = require("../../utils/token");
const cors = require("cors");
const { application } = require("express");

router.use(cors());

function checker(result) {
  if (!result.isEmpty()) {
    const error = { ...result };
    error.name = "ValidationError";
    throw error;
  }
}

// ======================================================================================

router.post("/register", async (req, res, next) => {
  checker(validationResult(req));

  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(password, salt);
    var usr = {
      name: name,
      email: email,
      password: hash,
    };
    const created_user = await User.create(usr);
    res.status(201).json({
      message: "User created successfully!",
      name: name,
      email: email,
    });
  } catch (err) {
    res.status(400).send({
      message: "Failed! Username or email is already in use!",
    });
  }
});

// ==============================================================================================

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    res.status(400).send({
      message: "Failed! User not found!",
    });
    return;
  }

  const result = await bcrypt.compare(req.body.password, user.password);
  console.log(result);
  //check Password
  if (!result) {
    return res.status(401).send({
      msg: "Password is incorrect ",
    });
  } else {
    //generate token
    const token = await generateToken(user);

    return res.send({
      message: "Login successful!",
      user: user,
      token: token,
    });
  }
});

// ==============================================================================================

module.exports = router;
