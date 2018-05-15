// controller class for users
import * as express from 'express';
import * as UserRoutes from './users.routes';

export class UserController {

  constructor(app: express.Express) {
    UserRoutes.default(app);
  }
}