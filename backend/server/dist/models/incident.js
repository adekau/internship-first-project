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
    };
    return Incident;
};
