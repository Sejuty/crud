const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const sequelize = require("./DB/dbModel");
const auth_jwt = require("./middleware/auth_jwt");
const Post =  require("./models/Post")
const User = require("./models/User")
const user_auth = require("./Controllers/user/register_login")
const user_crud = require("./Controllers/user/crud")
const userPost = require("./Controllers/posts/crud")

app.listen(3000, () => console.log("express server is running at port 3000"));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", user_auth);
app.use("/api/users", user_crud);
app.use("/api/user", userPost);

User.hasMany(Post,{
  onDelete : "CASCADE"
})

sequelize.sync();

app.get("/", (req, res) => {
  res.send("Welcome to Homepage");
});