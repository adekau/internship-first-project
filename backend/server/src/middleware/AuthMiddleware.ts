// Middleware for handling JWT authentication on the api.
import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import * as config from 'config';

export class AuthMiddleware {
    generateToken(user: any): string {
        let secret: string = config.get('auth.secret');
        return jwt.sign({ user: user.id }, secret, { expiresIn: '24hr' });
    }

    verifyToken(req: any, res: express.Response, next: express.NextFunction) {
        let token: string = <string>req.headers['x-access-token'];
        let secret: string = config.get('auth.secret');

        if (!token) {
            return res.status(403).json({
                status: 403,
                auth: false,
                text: 'No authentication token provided.'
            });
        }

        jwt.verify(token, secret, (err, decoded: any) => {
          if (err) {
            return res.status(500).json({
              status: 500,
              auth: false,
              text: 'Failed to verify authentication token.'
            });
          }

          req.userId = decoded.id;
          next();
        });
    }


}