const mysql = require("mysql");

var db = mysql.createConnection({
      host: "localhost",
      user:'root',
      Password:'1234',
      database: "crudDB",
    });
    
module.exports = db;