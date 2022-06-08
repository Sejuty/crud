const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth_jwt = require("../middleware/auth_jwt");

router.get('/all',async (req,res)=>{ //get all users
  const users = await User.findAll();
  console.log(users.every(user => user instanceof User)); // true
  res.send(JSON.stringify(users, null, 2));
})




//get user by id
router.get('/:id',async (req,res)=>{
  const user = await User.findByPk(req.params.id);
  if(!user){
    return res.status(404).send({
      message: "User not found!"
    });
  }
  res.send(JSON.stringify(user, null, 2));
}) 

//delete user by id
router.delete('/delete/:id',auth_jwt,async (req,res)=>{
  const user = await User.findByPk(req.params.id);
  if(!user){
    return res.status(404).send({
      message: "User is DELETED!"
    });
  }
  await user.destroy();
  res.send(JSON.stringify(user, null, 2));
})



//update password
router.put("/update/password/:id",auth_jwt, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  console.log(user);
  if (!user) {
    return res.status(404).send({
      message: "User not found!"
    });
  }
  const {oldPassword,newPassword } = req.body;
  const verify_oldPassword = await bcrypt.compare(req.body.oldPassword, user.Password);
  if (!verify_oldPassword) {
    return res.status(400).send({
      message: "Old password is incorrect!"
    });
  }
  const salt = await bcrypt.genSalt(8);
  const hash = await bcrypt.hash(newPassword, salt);
  await user.update({ Password: hash }, {
    where: {
      id: req.params.id
    }
  });
  res.send({
    message: "Password updated successfully!",
    user: user
  });
});




router.get("/", (req, res) => {
  res.send("This is user page");
});

module.exports = router;
