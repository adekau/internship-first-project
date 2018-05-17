// controller class for incidents
import * as express from 'express';
import * as IncidentRoutes from './incidents.routes';

export class IncidentController {

  constructor(app: express.Express) {
    IncidentRoutes.default(app);
  }
}