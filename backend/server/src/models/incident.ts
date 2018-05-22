module.exports = (sequelize, DataTypes) => {
    var Incident = sequelize.define('Incident', {
        userId: DataTypes.INTEGER,
        trackerId: DataTypes.INTEGER,
        lastHistoryId: DataTypes.INTEGER
    }, {
            freezeTableName: true,
            tableName: 'incidents'
        });

    Incident.associate = function (models) {
        models.Incident.belongsTo(models.User, { as: 'user' });
        models.Incident.belongsTo(models.User, { as: 'tracker' });
        models.Incident.hasMany(models.IncidentHistory, { foreignKey: 'incidentId', as: 'incidenthistory' });
        models.Incident.belongsTo(models.IncidentHistory, { foreignKey: 'lastHistoryId', as: 'latest'});
    }

    return Incident;
};