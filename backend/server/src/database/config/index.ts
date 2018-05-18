// file to configure and create sequelize instance

// FOR THE MOMENT, THIS FILE IS USELESS. 
// Database connection is handled in 'models/index.ts'

import * as Sequelize from 'sequelize';

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

export { sequelize as db };