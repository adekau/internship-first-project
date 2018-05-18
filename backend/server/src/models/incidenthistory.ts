module.exports = (sequelize, DataTypes) => {
    var IncidentHistory = sequelize.define('IncidentHistory', {
        revision: DataTypes.INTEGER,
        name: DataTypes.STRING,
        type: DataTypes.ENUM('information', 'noninformation'),
        description: DataTypes.STRING,
        cost: DataTypes.STRING,
        classification: DataTypes.ENUM('security', 'major', 'minor'),
        resolution: DataTypes.STRING,
        cafReference: DataTypes.STRING
    }, {
        freezeTableName: true,
        tableName: 'incidenthistory'
    });
    IncidentHistory.associate = function (models) {
        models.IncidentHistory.belongsTo(models.Incident, {
            as: 'incident'
        });
    };
    return IncidentHistory;
};