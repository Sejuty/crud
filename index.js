const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const sequelize = require("./models/dbModel");
const auth_jwt = require("./middleware/auth_jwt");
const Post =  require("./models/post")
const User = require("./models/User")
const userPost =require("./Controllers/postStory")

app.listen(3000, () => console.log("express server is running at port 3000"));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/auth_jwt", auth_jwt);
app.use("/api/user", userPost);

User.hasMany(Post,{
  onDelete : "CASCADE"
})

sequelize.sync();

app.get("/", (req, res) => {
  res.send("Welcome to Homepage");
});