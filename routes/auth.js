const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const sequelize = require("../models/dbModel");
const User = require("../models/User");
const { validationResult } = require("express-validator");

function checker(result) {
  if (!result.isEmpty()) {
    const error = { ...result };
    error.name = "ValidationError";
    throw error;
  }
}

// ========================================================================================

router.post("/register", async(req, res, next) => {
  checker(validationResult(req));
  
  const { Name, Email, Password } = req.body;
  try {
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(Password, salt);
    var usr = {
      Name: Name,
      Email: Email,
      Password: hash
    }
    const created_user = await User.create(usr);
    res.status(201).json(
      {
        message: "User created successfully!",
        user: created_user
      }
    );
  } catch (err) {
    res.status(400).send({
      message: "Failed! Username or Email is already in use!",
    });
  }
    
});

// ==============================================================================================

router.post("/login", async (req, res) => {
  const user = await User.findOne({ where: { Email: req.body.Email } }).then(
    (user) => {
      if (!user) {
        res.status(400).send({
          message: "Failed! User not found!",
        });
        return;
      }
      //check whether the user with that Email exists or not
      if (req.body.Email !== user.Email) {
        return res.status(401).send({
          msg: "Email is incorrect",
        });
      }
      //check Password
      bcrypt.compare(req.body.Password, user.Password, async (err, r) => {
        console.log(req.body.Password);
        console.log(user.Password);
        if (err) {
          return res.status(401).send({
            msg: "Password is incorrect ",
          });
        }

        const tokenName = user.Email;

        //generate token
        const token = jwt.sign(tokenName, process.env.SECRET_KEY);
        return res.status(200).send({
          msg: "logged in successfully",
          user: user,
          token,
        });
      });
    }
  );
});

module.exports = router;
