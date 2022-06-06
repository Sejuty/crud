const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const sequelize = require("./models/dbModel");

app.listen(3000, () => console.log("express server is running at port 3000"));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);


app.get("/", (req, res) => {
  res.send("Welcome to Homepage");
});

// var db = mysql.createConnection({
//   host: "localhost",
//   user  :'root',
//   Password:'1234',
//   database: "EmployeeDB",
// });

// db.connect((err) => {
//   if (!err) console.log("SUCCESS!!");
//   else
//     console.log("DB connection Failed :" + JSON.stringify(err, undefined, 2));
// });

// app.listen(3000,()=>console.log("express server is running at port 3000"));

// app.get('/employees',(req,res)=>{
//     db.query('SELECT * FROM Employee',(err,rows,fields)=>{
//         if(!err)
//         res.send(rows)
//         else
//         console.log(err);
//     })
// })

// //get an employee
// app.get('/employees/:id',(req,res)=>{
//     db.query('SELECT * FROM Employee WHERE EmpID = ?',[req.params.id],(err,rows,fields)=>{
//         if(!err)
//         res.send(rows)
//         else
//         console.log(err);
//     })
// })

// //delete an employee
// app.get('/employees/delete/:id',(req,res)=>{
//     db.query('DELETE FROM Employee WHERE EmpID = ?',[req.params.id],(err,rows,fields)=>{
//         if(!err)
//         res.send("Deleted succesfully")
//         else
//         console.log(err);
//     })
// })
