const router = require('express').Router()
const db = require('../models/user')


//register
router.get('/',(req,res)=>{
  res.send("This is user page")
})


module.exports = router