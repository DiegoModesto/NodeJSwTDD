const uuid = require('uuid/v4')
const faker = require('faker')
const { factory } = require('factory-girl')
const { User } = require('../src/app/models')

factory.define('UserFactory', User, {
    id: uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
})

module.exports = factory