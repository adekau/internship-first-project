"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const { Incident, User } = models_1.models;
Incident.associate = function (models) {
    models.Incident.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id'
    });
    models.Incident.belongsTo(models.User, {
        foreignKey: 'trackerId',
        targetKey: 'id'
    });
};
User.associate = function (models) {
};
