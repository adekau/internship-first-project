module.exports = (sequelize, DataTypes) => {
    var Incident = sequelize.define('Incident', {}, {});
    Incident.associate = function (models) {
        models.Incident.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'id'
        });
        models.Incident.belongsTo(models.User, {
            foreignKey: 'trackerId',
            targetKey: 'id'
        });
    };
    return Incident;
};
