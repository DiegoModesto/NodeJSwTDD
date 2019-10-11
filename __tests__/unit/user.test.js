const request = require('supertest')
const app = require('../../src/app')
const factory = require('../factories')
const truncate = require('../utils/truncate')

describe('User', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('should dosent insert user has have email in system', async () => {
        const user = await factory.create('UserFactory', {
            email: 'diegosanches89@gmail.com'
        })

        const response = await request(app)
            .post('/sessions/create')
            .send({
                name: user.name,
                email: user.email,
                password: user.password,
                retype_password: user.password
            })

        expect(response.status).toBe(500)
    })
})