const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const auth_jwt = require("../../middleware/auth_jwt");

//get all users
router.get("/all", async (req, res) => {
  const users = await User.findAll(); // true
  res.send(JSON.stringify(users, null, 2));
});

router.get("/profile",auth_jwt, async (req, res) => {
  const user = await User.findByPk(req.id)
  res.send({
    user
  });
});


//get user by id
router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).send({
      message: "User not found!",
    });
  }
  res.send(JSON.stringify(user, null, 2));
});

//delete user by id
///refactor it
router.delete("/delete", auth_jwt, async (req, res) => {
  const user = await User.findByPk(req.id);
  if (!user) {
    return res.status(404).send({
      message: "You are not authorized to delete this user!"
    });
  }
  await user.destroy();
  res.send({
    message: "User deleted successfully!"
  });
});

// router.get("/profile", (req, res) => {
//   res.send("This is profile page");
// });

//update password
router.put("/update/password", auth_jwt, async (req, res) => {
  console.log(req.body)
  const user = await User.findByPk(req.id);
  if (!user) {
    return res.status(404).send(
      {
        message: "You are not authorized to update this user!"
      }
    );
    }
  const { oldPassword, newPassword } = req.body;
  const verify_oldPassword = await bcrypt.compare(oldPassword, user.password);
  if (!verify_oldPassword) {
    return res.status(400).send({
      message: "Old password is incorrect!",
    });
  }
  const salt = await bcrypt.genSalt(8);
  const hash = await bcrypt.hash(newPassword, salt);
  await user.update(
    { password: hash },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.status(200).send({
    message: "password updated successfully!",
    user: user,
  });
});

router.get("/", (req, res) => {
  res.send("this is user page")
});

module.exports = router;
