"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../models/index");
const { Incident } = index_1.models;
exports.default = (app) => {
    const BASE = '/incidents';
    app.get(BASE, (req, res) => {
        res.json({
            status: 200,
            text: 'Route initialized'
        });
    });
};
