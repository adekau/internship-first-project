import * as express from 'express';
import * as Sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';
import { UserController } from './modules/users/users.controller';
import * as bodyParser from 'body-parser';
const app: express.Express = express();

// Middleware
app.use(bodyParser.json());

// db connection
const sequelize = new Sequelize('incidents', 'Alex', '', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
});

sequelize.authenticate().then(() => {
  console.log('Connection to DB successful');
}).catch(err => {
  console.error('Unable to connect to DB:', err);
});

// routes
const userController: UserController = new UserController(app);

app.listen(3000, () => console.log('app is listening on port 3000'));
