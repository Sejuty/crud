const Sequelize = require("sequelize")
const sequelize = require("./dbModel")

const User = sequelize.define("users",{
Name:{
    type:Sequelize.STRING,
    allowNull:false
},Email:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
},Password:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
},isAdmin:{
    type:Sequelize.BOOLEAN,
    default:false
},description:{
    type:Sequelize.STRING
}
},
{
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

module.exports = User;