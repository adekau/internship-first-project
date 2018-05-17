// Imports
import * as express from 'express';
import { Sequelize } from 'sequelize';
import * as bcrypt from 'bcrypt';

// Local Constants
const models = require('../../../../models/index');
const { User } = models;

export default (app: express.Express): void => {
  const BASE = '/users';

  // add user routes
  app.get(BASE, (req: express.Request, res: express.Response) => {

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

  app.post(BASE + '/authenticate', (req: express.Request, res: express.Response) => {

    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {

      if (user) {
        // Check that the password given in the request matches the decrypted version
        // in the database.
        let pass_equal = bcrypt.compare(req.body.password, user.password).then(same => {
          if (same) {
            // TODO: return a session object.
            res.json({
              status: 200,
              text: 'Passwords match.'
            })
          } else {
            // Probably leave like this?
            res.json({
              status: 401,
              text: 'Passwords do not match.'
            })
          }
        });
      } else {
        res.json({
          status: 404,
          text: 'User not found'
        });
      }
    });

  });

};