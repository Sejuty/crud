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
    res.status(404).send({
      message: "User not found!"
    });
  }
  res.send(JSON.stringify(user, null, 2));
}) 

//delete user by id
router.delete('/delete/:id',async (req,res)=>{
  const user = await User.findByPk(req.params.id);
  if(!user){
    res.status(404).send({
      message: "User is DELETED!"
    });
  }
  await user.destroy();
  res.send(JSON.stringify(user, null, 2));
})






//update an user
router.put("/update/:id",auth_jwt, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.send(JSON.stringify(user, null, 2));

  
  
});

//register
router.get("/", (req, res) => {
  res.send("This is user page");
});

module.exports = router;
