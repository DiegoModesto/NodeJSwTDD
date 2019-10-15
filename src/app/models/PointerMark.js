'use strict';
module.exports = (sequelize, DataTypes) => {
  const PointerMark = sequelize.define('PointerMark', {
    date_mark: DataTypes.RANGE(sequelize.DATE),
    pointer_id: DataTypes.UUID
  }, {
    freezeTableName: true,
    modelName: 'PointerMark',
    tableName: 'PointerMark',
    hooks: {
        beforeSave: async pointerMark => {
            if(!pointerMark.id)
            pointerMark.id = uuid()
        }
    }
  })
  return PointerMark
}