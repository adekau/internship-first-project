"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    const BASE = '/users';
    app.get(BASE, (req, res) => {
        res.send('hello');
    });
};
