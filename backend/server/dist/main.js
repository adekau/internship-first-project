"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const users_controller_1 = require("./modules/users/users.controller");
const app = express();
const userController = new users_controller_1.UserController(app);
app.listen(3000, () => console.log('app is listening on port 3000'));
