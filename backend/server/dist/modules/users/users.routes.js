"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const models = require('../../../../models/index');
const { User } = models;
exports.default = (app) => {
    const BASE = '/users';
    app.get(BASE, (req, res) => {
        User.findAll({
            attributes: {
                exclude: [
                    'password',
                    'createdAt',
                    'updatedAt',
                ]
            }
        }).then(data => {
            res.json(data);
        });
    });
    app.post(BASE + '/authenticate', (req, res) => {
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                let pass_equal = bcrypt.compare(req.body.password, user.password).then(same => {
                    if (same) {
                        res.json({
                            status: 200,
                            text: 'Passwords match.'
                        });
                    }
                    else {
                        res.json({
                            status: 401,
                            text: 'Passwords do not match.'
                        });
                    }
                });
            }
            else {
                res.json({
                    status: 404,
                    text: 'User not found'
                });
            }
        });
    });
};
