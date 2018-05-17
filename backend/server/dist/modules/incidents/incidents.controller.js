"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IncidentRoutes = require("./incidents.routes");
class IncidentController {
    constructor(app) {
        IncidentRoutes.default(app);
    }
}
exports.IncidentController = IncidentController;
