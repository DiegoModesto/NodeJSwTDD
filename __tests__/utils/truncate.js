const { sequelize } = require('../../src/app/models')

module.exports = () => {
    return Promise.all(Object.keys(sequelize.models).map(x => {
        return sequelize.models[x].destroy({ truncate: true, force: true })
    }))
}