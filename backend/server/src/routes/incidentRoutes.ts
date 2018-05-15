import * as express from 'express';

/*
/  PATH: /incidents
/  RETURNS: array with all incident ids
*/
export function index(req: express.Request, res: express.Response): void {
  res.json({'hello': 'world'});
}