const Sequelize = require('sequelize')
const connection = require('../postgres')

const Client = connection.define('client', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    name: {
        allowNull: true,
        type: Sequelize.STRING,
    },
})

module.exports = Client
