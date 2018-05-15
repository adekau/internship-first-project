import * as express from 'express';

const app: express.Express = express();

// Middleware

// Routes

// connect to db

// set static folder to serve angular app
// app.use(express.static(path.join(__dirname, staticDir)));


app.listen(3000, () => console.log('app is listening on port 3000'));
