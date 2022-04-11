const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const table_name = 'timelogs'
const Timelogs = sequelize.define(table_name, {
    timelogs: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    intime: {
        type: Sequelize.TIME,
        allowNull: false,

    },
    outtime: {
        type: Sequelize.TIME,
        allowNull: false,

    },
    duration: {
        type: Sequelize.TIME,
        allowNull: true,
        default: "00:00:00"

    }
});

module.exports = Timelogs;