"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Sequelize = require("sequelize");
const users_controller_1 = require("./modules/users/users.controller");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
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
sequelize.authenticate().then(() => {
    console.log('Connection to DB successful');
}).catch(err => {
    console.error('Unable to connect to DB:', err);
});
const userController = new users_controller_1.UserController(app);
app.listen(3000, () => console.log('app is listening on port 3000'));
