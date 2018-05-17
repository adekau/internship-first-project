module.exports = (sequelize, DataTypes) => {
  var Incident = sequelize.define('Incident', {}, {});

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
  };
  return Incident;
};