const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');
const sequelize = require("../models/dbModel");
const User = require('../models/User')
const { validationResult } = require("express-validator");


// ========================================================================================

router.post('/register', async(req, res, next)=>{
  User.findOne({
    where: {
      Name: req.body.Name
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }
    // Email
    User.findOne({
      where: {
        Email: req.body.Email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }
      next();
    });
  });
 
  let { Name, Email, Password } = req.body;

  const salt = await bcrypt.genSalt(8);
  var usr = {
    Name,
    Email,
    Password : await bcrypt.hash(Password, salt)
  };
  created_user = await User.create(usr);
  res.status(201).send({
    message: "Success! User created!",
    user: created_user
  });
});

// ==============================================================================================
  

router.post('/login',async(req,res,next)=>{
  const user = await User.findOne({ where : {Email : req.body.Email }});
  if(user){
    console.log(req.body.Password,user.Password)
     const password_valid = await bcrypt.compare(req.body.Password,user.Password);
     if(password_valid){
         token = jwt.sign({ "Email" : user.Email },process.env.SECRET_KEY);
         res.status(200).json({
            message: "Success! User logged in!",
            token: token
         });
     } else {
       res.status(400).json({ error : "Password Incorrect" });
     }
   
   }else{
     res.status(404).json({ error : "User does not exist" });
   }
   
   });module.exports = router;
