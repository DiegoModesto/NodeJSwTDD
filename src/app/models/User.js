const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uuid = require('uuid/v4')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING(50),
        email: DataTypes.STRING(120),
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING(50)
    }, {
        freezeTableName: true,
        modelName: 'User',
        tableName: 'User',
        hooks: {
            beforeSave: async user => {
                if(user.password)
                    user.password_hash = await bcrypt.hash(user.password, 8)
                if(!user.id)
                    user.id = uuid()
            }
        }
    })

    User.prototype.checkPassword = function(password) {
        return bcrypt.compare(password, this.password_hash)
    }

    User.prototype.generateToken = function() {
        return jwt.sign({ user_id: this.id }, process.env.APP_SECRET)
    }

    return User
}