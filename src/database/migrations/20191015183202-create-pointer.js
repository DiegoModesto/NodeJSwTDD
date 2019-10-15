'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pointer', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      date: {
        type: Sequelize.RANGE(Sequelize.DATE)
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'User'
          },
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.RANGE(Sequelize.DATE)
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.RANGE(Sequelize.DATE)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pointer');
  }
};