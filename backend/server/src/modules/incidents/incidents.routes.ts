import * as express from 'express';
import { Sequelize } from 'sequelize';
import { models } from '../../models/index'
import { isNumber } from 'util';
import { AuthMiddleware } from '../../middleware';

const { User, Incident } = models;
const auth = new AuthMiddleware();

export default (app: express.Express): void => {
  const BASE = '/incidents';

  // GET /incidents
  app.get(BASE, auth.verifyToken, (req: express.Request, res: express.Response) => {
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

  // POST /incidents
  app.post(BASE, auth.verifyToken, (req: express.Request, res: express.Response) => {
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

  // GET /incidents/:id
  app.get(BASE + '/:id', auth.verifyToken, (req: express.Request, res: express.Response) => {
    if (req.params.id && isNumber(+req.params.id)) {
      models.Incident.findOne({
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
    } else {
      res.json({
        status: 404,
        text: `Incident with id: ${req.params.id} not found.`
      });
    }
  });
}