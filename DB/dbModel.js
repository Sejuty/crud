const Sequelize = require("sequelize")

const sequelize = new Sequelize("cruddb","root","",{
  dialect:"mysql",
  host:"localhost"
})

// var db = mysql.createConnection({
//       host: "localhost",
//       user:'root',
//       Password:'1234',
//       database: "crudDB",
//     });

module.exports = sequelize