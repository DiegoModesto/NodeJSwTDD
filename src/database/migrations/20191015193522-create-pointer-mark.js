'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PointerMark', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      date_mark: {
        type: Sequelize.RANGE(Sequelize.DATE)
      },
      pointer_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'Pointer'
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
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PointerMark')
  }
}