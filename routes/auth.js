const router = require("express").Router();
const db = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/register", (req, res) => {
  let { Name, Password, Email } = req.body;

  //creating user object
  const user = {
    Name,
    Password,
    Email,
  };

  if (!Name) {
    return res.status(400).send({
      msg: "Name should not be empty",
    });
  }
  // Password min 6 chars
  if (!Password || Password.length < 6) {
    return res.status(400).send({
      msg: "Please enter a Password with min. 6 chars",
    });
  }

  db.query(`SELECT * FROM users WHERE Email=?`, Email, (err, result) => {
    if (err) {
      return res.status(400).send({
        msg: err,
      });
    }

    //check whether Namealready exist or not
    if (result.length !== 0) {
      return res.status(409).send({
        msg: "This Email is already in use!",
      });
    }
    // Nameis available

    bcrypt
      .hash(Password, 8)
      .then((hash) => {
        //set the Password to hash value
        user.Password = hash;
      })
      .then(() => {
        db.query("INSERT INTO users SET ?", user, (err, result) => {
          if (err) {
            return res.status(400).send({
              msg: err,
            });
          }

          db.query(
            "SELECT * FROM users WHERE Email=?",
            Email,
            (err, result) => {
              if (err) {
                return res.status(400).send({
                  msg: err,
                });
              }

              return res.status(201).send({
                userdata: user,
                msg: "successfully registered",
              });
            }
          );
        });
      });
  });
});

// router.post('/register',(req,res)=>{
//     let emp = req.body
//     console.log(emp)
//     var sql = "INSERT INTO users (Name, Password, Email) VALUES (?,?,?);"
//     db.query(sql,[emp.Name,emp.Password,emp.Email],(err)=>{
//         if(!err)
//         res.send("ok")
//         else
//         console.log(err)
//     })

// })

router.post("/login", (req, res) => {
  const { Email, Password } = req.body;

  if (req.body.Email.trim() === "" || req.body.Password.trim() === "") {
    return res.status(400).send({ msg: "Email or Password must not be empty" });
  }

  db.query("SELECT * FROM users WHERE Email=?", Email, (err, result) => {
    if (err) {
      return res.status(400).send({
        msg: err,
      });
    }

    //check whether the user with that Email exists or not
    if (result.length === 0) {
      return res.status(401).send({
        msg: "Email is incorrect",
      });
    }

    //check Password
    bcrypt.compare(Password, result[0].Password, (err, r) => {
      console.log(req.body.Password);
      console.log(result[0].Password);
      if (err) {
        return res.status(401).send({
          msg: "Password is incorrect ",
        });
      }

      const tokenName = result[0].Name;

      //generate token
      const token = jwt.sign(tokenName, process.env.SECRET_KEY);
      return res.status(200).send({
        msg: "logged in successfully",
        user: result[0],
        token,
      });
    });
  });
});
module.exports = router;
