import * as express from 'express';
import { Sequelize } from 'sequelize';
import { models } from '../../models/index'

const { Incident } = models;

export default (app: express.Express): void => {
  const BASE = '/incidents';

  app.get(BASE, (req: express.Request, res: express.Response) => {
    res.json({
      status: 200,
      text: 'Route initialized'
    });
  });
}