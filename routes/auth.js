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

router.post("/register", async (req, res, next) => {
  checker(validationResult(req));
  User.findOne({
    where: {
      Name: req.body.Name,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }
  }, (err) => {
    // Email
    User.findOne({
      where: {
        Email: req.body.Email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
        return;
      }
      next();
    });
  });

  let { Name, Email, Password } = req.body;

  const salt = await bcrypt.genSalt(8);
  var usr = {
    Name: Name,
    Email: Email,
    Password: await bcrypt.hash(Password, salt),
  };
  created_user = await User.create(usr);
  res.status(201).json(
    {
      message: "User created successfully!",
      user: created_user

    }
  );
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
      bcrypt.compare(req.body.Password, user.Password, (err, r) => {
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
