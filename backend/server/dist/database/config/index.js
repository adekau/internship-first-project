"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const sequelize = new Sequelize('incidents', 'Alex', '', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});
exports.db = sequelize;
sequelize.authenticate().then(() => {
    console.log('Connection to DB successful');
}).catch(err => {
    console.error('Unable to connect to DB:', err);
});
