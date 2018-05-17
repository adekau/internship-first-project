"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../models/index");
const util_1 = require("util");
const { User, Incident } = index_1.models;
exports.default = (app) => {
    const BASE = '/incidents';
    app.get(BASE, (req, res) => {
        Incident.findAll({
            include: [{
                    model: User,
                    as: 'user',
                    attributes: ['id', 'firstName', 'lastName', 'email', 'role']
                }],
            attributes: {
                exclude: ['userId', 'trackerId', 'lastHistoryId']
            }
        }).then(data => {
            res.json(data);
        });
    });
    app.post(BASE, (req, res) => {
        Incident.create({
            userId: req.body.userId,
            trackerId: req.body.trackerId,
            lastHistoryId: req.body.lastHistoryId
        }).then(incident => {
            res.json({
                status: 200,
                text: `Successfully created incident with id: ${incident.id}.`
            });
        }).catch(err => {
            if (err) {
                console.error('Encountered an error creating a new incident:', err);
                res.json({
                    status: 500,
                    text: 'An error occurred creating a new incident. Please try again.'
                });
            }
        });
    });
    app.get(BASE + '/:id', (req, res) => {
        if (req.params.id && util_1.isNumber(+req.params.id)) {
            index_1.models.Incident.findOne({
                where: { id: req.params.id },
                include: [
                    {
                        as: 'user',
                        model: User,
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt']
                        }
                    }
                ],
                attributes: {
                    exclude: ['userId', 'trackerId', 'lastHistoryId']
                }
            }).then(incident => {
                res.json(incident);
            });
        }
        else {
            res.json({
                status: 404,
                text: `Incident with id: ${req.params.id} not found.`
            });
        }
    });
};
