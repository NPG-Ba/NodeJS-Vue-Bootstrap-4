const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    "employee",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        comment: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)