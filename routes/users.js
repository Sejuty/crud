const router = require("express").Router();
const db = require("../models/User.js");
const bcrypt = require("bcrypt");



//update an user

router.put("/:id", async (req, res) => {
  if (req.body.user_id === req.params.id) {
    res.send(db)
    // if (req.body.Password) {
    //   try {
    //     req.body.Password = await bcrypt.hash(req.body.Password, 8);
    //   } catch (err) {
    //     return res.status(111).send({
    //       msg:"Password Update failed",
    //       err
    //     })
    //   }
    // }

    // try{
    //   const user = await user.findByIdAndUpdate(req.params.id, {
    //     $set: req.body,
    //   });
    //   res.status(200).json("Account has been updated");
    // } catch (err) {
    //   return res.status(500).json(err);
    // }
  } else {
    return res.status(401).send({
      msg: "Can't Update",
    });
  }
});

//register
router.get("/", (req, res) => {
  res.send("This is user page");
});

module.exports = router;
