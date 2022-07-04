const Sequelize = require("sequelize")
const sequelize = require("../DB/dbModel")

const User = sequelize.define("users", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }, email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }, password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
},
    {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });

module.exports = User;