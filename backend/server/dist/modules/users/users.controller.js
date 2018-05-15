"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRoutes = require("./users.routes");
class UserController {
    constructor(app) {
        UserRoutes.default(app);
    }
}
exports.UserController = UserController;
