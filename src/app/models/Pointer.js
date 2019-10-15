'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pointer = sequelize.define('Pointer', {
    date: DataTypes.RANGE(sequelize.DATE),
    user_id: DataTypes.UUID
  }, {
    freezeTableName: true,
    modelName: 'Pointer',
    tableName: 'Pointer',
    hooks: {
        beforeSave: async pointer => {
            if(!pointer.id)
              pointer.id = uuid()
        }
    }
  })

  return Pointer
}