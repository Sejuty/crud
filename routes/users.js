const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

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
router.put("/update/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.send(JSON.stringify(user, null, 2));
  // if(!user){
  //   res.status(404).send({
  //     message: "User not found!"
  //   });
  // }

//  console.log(req.body.id,req.params.id);
//   if (req.body.id === req.params.id) {
    
//   }
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

  //   try{
  //     const user = await user.findByIdAndUpdate(req.params.id, {
  //       $set: req.body,
  //     });
  //     res.status(200).json("Account has been updated");
  //   } catch (err) {
  //     return res.status(500).json(err);
  //   }
  // } else {
  //   return res.status(401).send({
  //     msg: "Can't Update",
  //   });
  
});

//register
router.get("/", (req, res) => {
  res.send("This is user page");
});

module.exports = router;
