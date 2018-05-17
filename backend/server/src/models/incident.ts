module.exports = (sequelize, DataTypes) => {
  var Incident = sequelize.define('Incident', {}, {});

  return Incident;
};