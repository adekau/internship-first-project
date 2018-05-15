import * as express from 'express';

export default (app: express.Express): void => {
  const BASE = '/users';

  // add user routes
  app.get(BASE, (req: express.Request, res: express.Response) => {
    res.send('hello');
  });

};