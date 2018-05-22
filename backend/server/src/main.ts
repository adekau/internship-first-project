import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as modules from './modules';
import * as bodyParser from 'body-parser';
import * as db from './database';

const app: express.Express = express();
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));

// routes
const userController = new modules.UserController(app);
const incidentsController = new modules.IncidentController(app);
const incidentHistoryController = new modules.IncidentHistoryController(app);

app.listen(3000, () => console.log('app is listening on port 3000'));
