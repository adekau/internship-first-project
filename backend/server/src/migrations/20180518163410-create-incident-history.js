'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('incidenthistory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      revision: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('information','noninformation')
      },
      description: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.STRING
      },
      classification: {
        type: Sequelize.ENUM('security', 'major', 'minor')
      },
      resolution: {
        type: Sequelize.STRING
      },
      cafReference: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('incidenthistory');
  }
};