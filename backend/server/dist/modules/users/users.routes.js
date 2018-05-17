"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const index_1 = require("../../models/index");
const util_1 = require("util");
const { User, Incident } = index_1.models;
exports.default = (app) => {
    const BASE = '/users';
    const secret = "adekmaestro";
    app.get(BASE, (req, res) => {
        User.findAll({
            include: [
                {
                    model: Incident,
                    as: 'incidents'
                }
            ],
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
    app.get(BASE + '/:id/incidents', (req, res) => {
        if (req.params.id && util_1.isNumber(+req.params.id)) {
            User.findOne({
                where: {
                    id: req.params.id
                }
            }).then(user => {
                user.getIncidents().then(incidents => {
                    res.json(incidents);
                });
            });
        }
        else {
            res.json({
                status: 404,
                text: `Incident with id: ${req.params.id} not found.`
            });
        }
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
                        var token = jwt.sign({ user: user.id }, secret, { expiresIn: '24hr' });
                        let str = "Hello";
                        res.json({
                            status: 200,
                            text: "Authenticated.",
                            token: token
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
