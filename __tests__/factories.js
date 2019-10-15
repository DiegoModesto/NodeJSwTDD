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

factory.define('MarkFactory', Pointer, {
    id: uuid(),
    date: faker.date.future(),
    user_id: uuid()
})

module.exports = factory