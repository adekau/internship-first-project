// function that will set associations between models and sync the database
import { db } from './config';
import { models } from '../models';
const { Incident, User } = models;


Incident.associate = function(models) {
  models.Incident.belongsTo(models.User, {
    foreignKey: 'userId',
    targetKey: 'id'
  });

  models.Incident.belongsTo(models.User, {
    foreignKey: 'trackerId',
    targetKey: 'id'
  });

  //TODO: Add foriegn key for lastHistoryId once that model is created.
}

User.associate = function(models) {

}