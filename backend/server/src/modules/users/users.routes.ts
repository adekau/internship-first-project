// Imports
import * as express from 'express';
import { Sequelize } from 'sequelize';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { models } from '../../models/index'

// Local Constants
const { User } = models;

export default (app: express.Express): void => {
  const BASE = '/users';
  const secret = "adekmaestro";
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
            // Generate a JSON web token using jwt library.
            var token = jwt.sign({ user: user.id }, secret, { expiresIn: '24hr' });
            let str: any = "Hello";
            res.json({
              status: 200,
              text: "Authenticated.",
              token: token
            })
          } else {
            res.json({
              status: 401,
              text: 'Passwords do not match.'
            })
          }
        });
      } else {
        // A user with that email does not exist in the DB.
        res.json({
          status: 404,
          text: 'User not found'
        });
      }
    });

  });

};