// Controller for the incidenthistory module.
import * as express from 'express';
import * as IncidentHistoryRoutes from './incidenthistory.routes';

export class IncidentHistoryController {
    constructor(app: express.Express) {
        IncidentHistoryRoutes.default(app);
    }
}