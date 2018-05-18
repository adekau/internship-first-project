"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config = require("config");
class AuthMiddleware {
    generateToken(user) {
        let secret = config.get('auth.secret');
        return jwt.sign({ user: user.id }, secret, { expiresIn: '24hr' });
    }
    verifyToken(req, res, next) {
        let token = req.headers['x-access-token'];
        let secret = config.get('auth.secret');
        if (!token) {
            return res.status(403).json({
                status: 403,
                auth: false,
                text: 'No authentication token provided.'
            });
        }
        jwt.verify(token, secret, (err, decoded) => {
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
exports.AuthMiddleware = AuthMiddleware;
